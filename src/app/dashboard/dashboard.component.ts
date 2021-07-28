import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() user="";
  @Input() routera="";
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user")).name;
    this.routera=this.router.url;
    // console.log(this.user);
    
  }

}
