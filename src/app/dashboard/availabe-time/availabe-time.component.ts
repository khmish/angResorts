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
  addData(){

  }

}
