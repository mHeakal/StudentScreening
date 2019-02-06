import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>('http://localhost:8000/api/admin/questions');
  }

  insertQuestion(question:Question):Observable<Question>{
    return this.http.post<Question>('http://localhost:8000/api/admin/questions/:', question);
  }

  deleteQuestion(question:Question):Observable<void>{
    return this.http.delete<void>('http://localhost:8000/api/admin/questions/'+ question._id);
  }

  updateQuestionStatus(question:Question):Observable<void>{
    return this.http.patch<void>('http://localhost:8000/api/admin/questions/'+ question._id,question);
  }
}

export interface Question{
  _id?: string;
  question: string;
  status: boolean;
}