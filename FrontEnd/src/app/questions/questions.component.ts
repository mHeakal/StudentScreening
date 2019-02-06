import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../services/question.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
 private questions: Question[];
  questionForm: FormGroup;
  
 constructor(private questionService: QuestionService, private modalService: NgbModal) {
   this.questionForm = this.createQuestionFormGroup();
  }

  ngOnInit() {
    this.getAllQuestions();    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmit(){
    const question: Question = Object.assign({},this.questionForm.value);
    this.insertQuestion(question);
  }

  createQuestionFormGroup(){
    return new FormGroup({
      question: new FormControl('', Validators.required),
      status: new FormControl(false)
    });
  }

  getAllQuestions(){
    this.questionService.getAllQuestions().subscribe(result => {
      //console.log("List of Questions: "+result);
      this.questions = result;
    });
  }

  insertQuestion(question:Question){
    console.log(question);
    this.questionService.insertQuestion(question).subscribe(result =>{
      console.log("Add Question: " + JSON.stringify(result));
      this.getAllQuestions();
    });
  }

  deleteQuestion(q:Question){
    this.questionService.deleteQuestion(q).subscribe(result =>{
      console.log("Deleted Question: " + JSON.stringify(result));
      this.getAllQuestions();
    });
  }

  updateQuestionStatus(q:Question){
    this.questionService.updateQuestionStatus(q).subscribe(result =>{
      console.log("Update Question status: " + JSON.stringify(result));
    });
  }
}
