import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {
  
  jwtHelper: JwtHelperService;
  constructor(private http: HttpClient) { }
  isUserExist(body) {
    console.log('checking.....')
    return this.http.post('http://localhost:8000/api/login', body);
  }

  
  public async isAuthenticatedForAdminRoute()  {
    this.jwtHelper = new JwtHelperService();

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const token = userDetails.token;
    let role : String = ""; 
    await this.http.post('http://localhost:8000/api/user-check', {token: token}).subscribe (
      response => {
        console.log(response);
        let resp = JSON.parse(JSON.stringify(response));
        console.log(""+(resp.success == true));
        if(resp.success == true && resp.role.toLowerCase() == "admin" && resp.token){
          role = resp.role.toLowerCase();
        }else if(resp.success == true && resp.role.toLowerCase() == "staff" && resp.token){
          role = resp.role.toLowerCase();
        }

      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Empty");
      }
    );
    // Check whether the token is expired and return
    // true or false
    // console.log('is token expired '+this.jwtHelper.isTokenExpired(token));
    // return !this.jwtHelper.isTokenExpired(token);
    return role;
  }

  public isAuthenticated(type): boolean {
    this.jwtHelper = new JwtHelperService();

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const token = userDetails.token;
    if(token && userDetails.role.toLowerCase() == type)
    return true;
    else return false;
    // console.log('is token expired '+this.jwtHelper.isTokenExpired(token));
    // return !this.jwtHelper.isTokenExpired(token);

  }
}