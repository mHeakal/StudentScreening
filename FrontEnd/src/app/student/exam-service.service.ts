import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {

private url = 'http://localhost:8000/api/';
  private myHeader;// params;
  constructor(public http: HttpClient) { }

  getStaffList(pageNumber:number){
    this.myHeader =new Headers();
    this.myHeader.append('Content-Type', "application/json");
    return this.http.get(this.url+'staff', {headers: this.myHeader});

  }
}
