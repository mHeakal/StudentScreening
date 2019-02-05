import { Injectable } from '@angular/core';

import { JsonPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {
  private url = 'http://localhost:8000/api/login';
  private myHeader;// params;
  constructor(public http: HttpClient) { }

  getStaffList(pageNumber:number){
    this.myHeader =new Headers();
    this.myHeader.append('Content-Type', "application/json");
    return this.http.get(this.url+'api/staff', {headers: this.myHeader});

  }

  changeStatus(user){
    this.myHeader =new Headers();
    this.myHeader.append('Content-Type', "application/json");
    // this.params = new HttpParams();
    // this.params.
    return this.http.put(this.url+'/admin/staff/change_status/:'+user.id, {headers: this.myHeader});

  }


}
