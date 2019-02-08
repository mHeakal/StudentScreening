import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

constructor(private http: HttpClient) { }

getAllStaff(): Observable<Staff[]>{
  return this.http.get<Staff[]>('http://localhost:8000/api/admin/staff');
}

insertStaff(staff:Staff):Observable<Staff>{
  return this.http.post<Staff>('http://localhost:8000/api/admin/staff/:', staff);
}

deleteStaff(staff:Staff):Observable<void>{
  return this.http.delete<void>('http://localhost:8000/api/admin/staff/'+ staff._id);
}

updateStaffStatus(staff:Staff):Observable<void>{
  return this.http.patch<void>('http://localhost:8000/api/admin/staff/'+ staff._id,staff);
}
}

export interface Staff{
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
}