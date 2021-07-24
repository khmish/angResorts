import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { HttpRequestService } from '../services/http-request.service';
import {Router} from '@angular/router';
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private fb: FormBuilder, private httpRequestService: HttpRequestService, public auth: AuthService,private _snackBar: MatSnackBar,private route:Router) { }

  ngOnInit(): void {
    this.auth.isAuthenticated().then((val)=>{
      this.route.navigate(["/dash"]);
    })
  }
  onSubmit() {
    this.httpRequestService.post("login", { email: this.addressForm.controls.userName.value, password: this.addressForm.controls.password.value }).subscribe((data) => {
      // console.log(data);
      this.auth.setToken(data.data);
      this.route.navigate(["/dash"]);
    },(error)=>{
      console.log(error);
      
      this._snackBar.open(error, 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
    console.log("submitted");
  }

}
