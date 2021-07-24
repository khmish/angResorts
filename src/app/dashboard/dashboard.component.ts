import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() user="";
  constructor() { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user")).name;
    // console.log(this.user);
    
  }

}
