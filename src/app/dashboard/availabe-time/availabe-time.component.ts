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
  selector: 'app-availabe-time',
  templateUrl: './availabe-time.component.html',
  styleUrls: ['./availabe-time.component.css']
})
export class AvailabeTimeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'longitude'];
  dataSource = new MatTableDataSource([]);
  constructor(private request: HttpRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.request.get("availabletimes").subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
