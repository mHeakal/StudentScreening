import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {

  constructor(private http: HttpClient) { }
  isUserExist(body) {
    console.log('checking.....')
    return this.http.post('http://localhost:8000/api/login', body);
  }
}