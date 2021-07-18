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




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'modifications'];
  dataSource = new MatTableDataSource([]);
  constructor(private request: HttpRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.request.get("users").subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addData() {
    this.dialog.open(AddUserDialog).afterClosed().subscribe(
      (data) => {
        this.ngOnInit();
      }
    );
  }
  edit(id) {
    let editedItem;
    console.log(id);

    this.dataSource.data.forEach((item) => {


      if (item.id === id) {

        editedItem = item;
        return;
      }
    });
    this.dialog.open(EditUserDialog, {
      data: editedItem
    }).afterClosed().subscribe(
      (data) => {
        this.ngOnInit();
      }
    );
  }
  delete(id) {
    let editedItem;
    console.log(id);

    this.dataSource.data.forEach((item) => {

      if (item.id === id) {

        editedItem = item;
        return;
      }
    });
    this.dialog.open(DeleteUserDialog, {
      data: editedItem
    }).afterClosed().subscribe(
      (data) => {
        this.ngOnInit();
      }
    );
  }

}

//----------------------------------add user---------------------------------------------
@Component({
  selector: 'add-user',
  templateUrl: './add/add-user.html',
})

export class AddUserDialog {
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
    password: [null, Validators.required],
    name: [null, Validators.required],
    email: [null, Validators.required],
    role: [null, Validators.required],

  });


  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {
  }


  selectedRole(value) {
    console.log(value);

  }



  onSubmit() {
    console.log(this.addressForm);
    if (this.addressForm.valid) {

      this.httpRequestService.post("register", this.addressForm.value).subscribe((data) => {
        console.log("sent data add");

        this.openSnackBar();
      });
    }

  }
}



//----------------------------------edit user---------------------------------------------
@Component({
  selector: 'edit-user',
  templateUrl: './edit/edit-user.html',
})

export class EditUserDialog {
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
    id: [null, Validators.required],
    name: [null, Validators.required],
    password: [null, Validators.required],
    email: [null, Validators.required],
    role: [null, Validators.required],

  });


  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {
    this.addressForm.patchValue(this.data);
    // console.log(this.addressForm.value);

  }
  getUserInfo() {


    this.httpRequestService.get("users/" + this.data.id).subscribe((data) => {

    });
  }

  selectedRole(value) {

  }

  onSubmit() {
    if (this.addressForm.valid) {

      this.httpRequestService.put("users/" + this.data.id, this.addressForm.value).subscribe((data) => {
        this.openSnackBar();
      });
    }

  }
}
//----------------------------------edit user---------------------------------------------
@Component({
  selector: 'delete-user',
  templateUrl: './delete/delete-user.html',
})

export class DeleteUserDialog {
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
    id: [null, Validators.required],
    name: [null, Validators.required],
    password: [null, Validators.required],
    email: [null, Validators.required],
    role: [null, Validators.required],

  });


  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {
    this.addressForm.patchValue(this.data);
    console.log(this.data);
    
  }


  delete() {
   
      this.httpRequestService.delete("users/" + this.data.id).subscribe((data) => {
        this.openSnackBar();
      });
   

  }
}
