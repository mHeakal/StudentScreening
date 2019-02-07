import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

constructor(private http: HttpClient) { }

getAllStudents(): Observable<Student[]>{
  return this.http.get<Student[]>('http://localhost:8000/api/staff/students');
}

sendInvitation(student:Student):Observable<Student>{
  return this.http.post<Student>('http://localhost:8000/api/staff/invitation/:', student);
}

}

export interface Student{
  _id?: string;
  name: string;
  email: string;
  status: string;
}