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

  
  public isAuthenticated(): boolean {
    this.jwtHelper = new JwtHelperService();

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const token = userDetails.token;
    // Check whether the token is expired and return
    // true or false
    console.log('is token expired '+this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
  }

  
}