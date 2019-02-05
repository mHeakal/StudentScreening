import { Injectable } from '@angular/core';

import { JsonPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {
  private url = 'http://localhost:8000/api/';
  private myHeader;// params;
  constructor(public http: HttpClient) { }

  getStaffList(pageNumber:number){
    this.myHeader =new Headers();
    this.myHeader.append('Content-Type', "application/json");
    return this.http.get(this.url+'staff', {headers: this.myHeader});

  }

  changeStatus(user, isActive){
    this.myHeader =new Headers();
    this.myHeader.append('Content-Type', "application/json");
    // this.params = new HttpParams();
    // this.params.
    return this.http.put(this.url+'admin/staff/change_status/:'+user._id+'/:'+isActive, {headers: this.myHeader});

  }


}
