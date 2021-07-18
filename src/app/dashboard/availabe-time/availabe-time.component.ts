import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

// export interface Country {
//   id: number;
//   name: string;
// }

// export interface City {
//   id: number;
//   name: string;
//   country_id: number;
//   country: Country;
// }

// export interface District {
//   id: number;
//   name: string;
//   city_id: number;
//   city: City;
// }

// export interface Resort {
//   id: number;
//   name: string;
//   description: string;
//   district: District;
// }

// export interface RootObject {
//   id: number;
//   availableDate: Date;
//   startTime: string;
//   endTime: string;
//   resort: Resort;
//   cost: number;
// }

@Component({
  selector: 'app-availabe-time',
  templateUrl: './availabe-time.component.html',
  styleUrls: ['./availabe-time.component.css']
})
export class AvailabeTimeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'availableDate', 'name', 'dist_name','dist_id'];
  
  dataSource = [];

  resortList=[];
  selectedResort;
  user=1;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private request: HttpRequestService,
     public dialog: MatDialog,
    private _snackBar: MatSnackBar,

     ) { }

  ngOnInit(): void {
    this.request.get("resorts?user="+this.user).subscribe((data) => {
      
      this.resortList = (data.data);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addData(){
    if(this.selectedResort){

      this.dialog.open(AddAvailabeTimeDialog,{
        data:{user:this.user,resort:this.selectedResort}
      }).afterClosed().subscribe((val)=>{
        this.onSelect(this.selectedResort);
      });
    }
    else{
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this._snackBar.open('please select a resort from the menu!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }
  onSelect(value){
    
    console.log(value);
    this.selectedResort=value.value;
    this.request.get("availabletimes?Resort_id="+this.selectedResort).subscribe((data) => {
      
      this.dataSource = (data.data);
    });
    
  }

  edit(id) {
    let editedItem;
    console.log(id);
    console.log(this.dataSource);

    this.dataSource.forEach((item) => {


      if (item.id === id) {

        editedItem = item;
        return;
      }
    });
    this.dialog.open(EditAvailabeTimeDialog, {
      data: {user:this.user,resort:this.selectedResort,id:editedItem}
    }).afterClosed().subscribe(
      (data) => {
        this.onSelect(this.selectedResort);

      }
    );
  }
  delete(id) {
    let editedItem;
    console.log(id);

    this.dataSource.forEach((item) => {


      if (item.id === id) {

        editedItem = item;
        return;
      }
    });
    this.dialog.open(DeleteAvailabeTimeDialog, {
      data: {id:editedItem}
    }).afterClosed().subscribe(
      (data) => {
        this.onSelect(this.selectedResort);

      }
    );
  }

}



//----------------------------------add AvailabeTime---------------------------------------------
@Component({
  selector: 'add-AvailabeTime',
  templateUrl: './add/add-AvailabeTime.html',
})

export class AddAvailabeTimeDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Output() isClose = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  addressForm = this.fb.group({
    // id: [null],
    availableDate: [null, Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required],
    cost: [null, Validators.required],
    createdBy: [null],
    Resort_id: [null],

  });
  

  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {
  }





  onSubmit() {
    if (this.addressForm.valid) {
      this.addressForm.controls.createdBy.patchValue(this.data.user);
      this.addressForm.controls.Resort_id.patchValue(this.data.resort);
      this.httpRequestService.post("availabletimes", this.addressForm.value).subscribe((data) => {
        // console.log("sent data add");

        this.openSnackBar();
      });
    }

  }
}


//----------------------------------edit AvailabeTime---------------------------------------------
@Component({
  selector: 'edit-AvailabeTime',
  templateUrl: './edit/edit-AvailabeTime.html',
})

export class EditAvailabeTimeDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Output() isClose = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  addressForm = this.fb.group({
    id: [null],
    availableDate: [null, Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required],
    cost: [null, Validators.required],
    createdBy: [null],
    Resort_id: [null],

  });
  

  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {
    console.log(this.data.id);
    
    this.addressForm.patchValue(this.data.id);
  }





  onSubmit() {
    if (this.addressForm.valid) {
      this.addressForm.controls.createdBy.patchValue(this.data.user);
      this.addressForm.controls.Resort_id.patchValue(this.data.resort);
      this.httpRequestService.put("availabletimes/"+this.data.id.id, this.addressForm.value).subscribe((data) => {
        // console.log("sent data add");

        this.openSnackBar();
      });
    }

  }
}


//----------------------------------edit AvailabeTime---------------------------------------------
@Component({
  selector: 'delete-AvailabeTime',
  templateUrl: './delete/delete-AvailabeTime.html',
})

export class DeleteAvailabeTimeDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Output() isClose = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  addressForm = this.fb.group({
    id: [null],
    availableDate: [null, Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required],
    cost: [null, Validators.required],
    createdBy: [null],
    Resort_id: [null],

  });
  

  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {

  }





  onSubmit() {
    if (this.addressForm.valid) {
      this.addressForm.controls.createdBy.patchValue(this.data.user);
      this.addressForm.controls.Resort_id.patchValue(this.data.resort);
      this.httpRequestService.post("availabletimes", this.addressForm.value).subscribe((data) => {
        // console.log("sent data add");

        this.openSnackBar();
      });
    }

  }
}




