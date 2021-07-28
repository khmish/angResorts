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
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'rentedBy', 'rentedDate', 'availableDate','cost','resort','state', 'modifications'];
  dataSource = new MatTableDataSource([]);
  constructor(private request: HttpRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.request.get("rents").subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addData() {
    
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
    
  }



}
