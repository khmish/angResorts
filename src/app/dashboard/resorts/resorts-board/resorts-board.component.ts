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
export interface PeriodicElement {
  name: string;
  id: number;
  description: string;
  longitude?: string;
}

@Component({
  selector: 'app-resorts-board',
  templateUrl: './resorts-board.component.html',
  styleUrls: ['./resorts-board.component.css']
})
export class ResortsBoardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'longitude'];
  dataSource = new MatTableDataSource([]);

  constructor(private request: HttpRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.request.get("resorts").subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
    });


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(val) {
    let editedItem;
    this.dataSource.data.forEach((item) => {
      if (item.id === val) {
        editedItem = item;
        return;
      }

    });
    this.dialog.open(EditResortDialog, {
      data: {
        editedItem
      }
    }).afterClosed().subscribe(
      (data) => {
        this.ngOnInit();
      }
    );
  }
  delete(val) {
    let deletedItem;
    this.dataSource.data.forEach((item) => {
      if (item.id === val) {
        deletedItem = item;
        return;
      }

    });
    this.dialog.open(DeleteResortDialog, {
      data: {
        deletedItem
      }
    }).afterClosed().subscribe(
      (data) => {
        this.ngOnInit();
      }
    );
  }

  addData() {
    this.dialog.open(AddResortDialog).afterClosed().subscribe(
      (data) => {
        this.ngOnInit();
      }
    );
  }

}



//**************************************************************add resort dailog************************************************************* */

@Component({
  selector: 'add-resort-dialog',
  templateUrl: './add/add-resort-dialog.html',
})

export class AddResortDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Output() isClose = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private httpRequestService: HttpRequestService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddResortDialog>) { }
  addressForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    country: [null, Validators.required],
    city: [null, Validators.required],
    district_id: [null, Validators.required],

  });
  countriesList = [];
  citiesList = [];
  distList = [];

  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {

    this.getCounties();
    // this.openSnackBar();
  }

  getCounties(): boolean {
    this.httpRequestService.get("countries").subscribe((data) => {
      this.countriesList = (data.data);
      this.addressForm.controls.city.patchValue(null);
      this.addressForm.controls.district_id.patchValue(null);
      return true;
    });
    return false;
  }
  getCities(): boolean {
    // console.log(this.addressForm.controls.country);

    this.httpRequestService.get("citiesInCountry/" + this.addressForm.controls.country.value).subscribe((data) => {
      this.citiesList = (data.data);
      this.addressForm.controls.district_id.patchValue(null);
      return true;


    });
    return false;

  }
  getDist(): boolean {
    this.httpRequestService.get("districtsInCity/" + this.addressForm.controls.city.value).subscribe((data) => {
      this.distList = (data.data);
      return true;

    });
    return false;

  }


  selectedCountry(value) {

    if (value) {
      console.log("enter select country");

      this.getCities();
    }
  }
  selectedCity(value) {

    if (value) {
      this.getDist();
    }
  }
  selectedDist(value) {


  }

  onSubmit() {
    if (this.addressForm.valid) {

      this.httpRequestService.post("resorts", this.addressForm.value).subscribe((data) => {
        this.openSnackBar();
      });
    }

  }
}


//**************************************************************DELETE resort dailog************************************************************* */
@Component({
  selector: 'delete-resort-dialog',
  templateUrl: './delete/delete-resort-dialog.html',
})

export class DeleteResortDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  ngOnInit() {
    console.log(this.data);

  }
  openSnackBar() {
    this._snackBar.open('Deleted!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }
  delete() {
    this.httpRequestService.delete("resorts/" + this.data.deletedItem.id).subscribe((data) => {
      this.openSnackBar();
    })
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private httpRequestService: HttpRequestService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddResortDialog>) { }
}



//**************************************************************EDIT resort dailog************************************************************* */
@Component({
  selector: 'edit-resort-dialog',
  templateUrl: './edit/edit-resort-dialog.html',
})

export class EditResortDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Output() isClose = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddResortDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  addressForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    country: [null, Validators.required],
    city: [null, Validators.required],
    district_id: [null, Validators.required],

  });
  countriesList = [];
  citiesList = [];
  distList = [];

  openSnackBar() {
    this._snackBar.open('Saved!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

  ngOnInit(): void {

    // this.getCounties();
    this.getResortInfo();
  }
  getResortInfo() {
    this.httpRequestService.get("resorts/" + this.data.editedItem.id).subscribe((data) => {
      console.log(data);
      this.addressForm.controls.name.patchValue(data.data.name);
      this.addressForm.controls.description.patchValue(data.data.description);
      this.getCounties();
      this.addressForm.controls.country.patchValue(data.data.country.name);
      this.getCities();
      this.addressForm.controls.city.patchValue(data.data.city.name);
      this.getDist();
      this.addressForm.controls.district_id.patchValue(data.data.district.name);
    });
  }

  getCounties(): boolean {
    this.httpRequestService.get("countries").subscribe((data) => {
      this.countriesList = (data.data);
      this.addressForm.controls.city.patchValue(null);
      this.addressForm.controls.district_id.patchValue(null);
      return true;
    });
    return false;
  }
  getCities(): boolean {
    // console.log(this.addressForm.controls.country);

    this.httpRequestService.get("citiesInCountry/" + this.addressForm.controls.country.value).subscribe((data) => {
      this.citiesList = (data.data);
      this.addressForm.controls.district_id.patchValue(null);
      return true;


    });
    return false;

  }
  getDist(): boolean {
    this.httpRequestService.get("districtsInCity/" + this.addressForm.controls.city.value).subscribe((data) => {
      this.distList = (data.data);
      return true;

    });
    return false;

  }


  selectedCountry(value) {

    if (value) {

      this.getCities();
    }
  }
  selectedCity(value) {

    if (value) {
      this.getDist();
    }
  }
  selectedDist(value) {


  }

  onSubmit() {
    if (this.addressForm.valid) {

      this.httpRequestService.put("resorts/" + this.data.editedItem.id, this.addressForm.value).subscribe((data) => {
        this.openSnackBar();
      });
    }

  }
}