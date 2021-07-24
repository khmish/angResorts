import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpRequestService) { }
  public setToken(value: string) {
    localStorage.setItem('token', value);

  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public async isAuthenticated(): Promise<boolean> {
    // get the token
    const token = this.getToken();
    console.log(token);
    
    if(token==null){
      return false;
    }
    
    let isAuth=await this.http.post("me", {});
    // return a boolean reflecting 
    // whether or not the token is expired
    return isAuth.toPromise().then(val=>{
      localStorage.setItem("user",JSON.stringify(val));
      return true;
    }).catch(err=>{
      return false;
    });
  }
}
