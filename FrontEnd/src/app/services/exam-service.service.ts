import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {

private url = 'http://localhost:8000/api/';
  private myHeader;// params;
  constructor(public http: HttpClient) { }

  studentAuthenticated(token: string): any {
    return this.http.get(this.url+'/student/authenticated/'+token);
  }

  getQuestionForStudent(token: string): any {
    return this.http.get(this.url+'/student/questions/'+token);
  }

  submitAnswers(data): any {
    return this.http.patch(this.url+'/student/questions/submit-answer', data);
  }
}
