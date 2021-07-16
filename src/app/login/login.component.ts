import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from '../services/http-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  addressForm = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required],
    
  });
  constructor(private fb: FormBuilder, private httpRequestService: HttpRequestService,) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    this.httpRequestService.get("availabletimes").subscribe((data)=>{
    console.log(data);

    });
    console.log("submitted");
  }

}
