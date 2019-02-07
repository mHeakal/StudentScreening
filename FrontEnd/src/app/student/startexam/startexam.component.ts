import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamServiceService } from 'src/app/services/exam-service.service';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-startexam',
  templateUrl: './startexam.component.html',
  styleUrls: ['./startexam.component.css']
})
export class StartexamComponent implements OnInit, OnDestroy {
  token="";
  isValid = false;
  questionsForm: FormGroup;
  data: {};
  questionObj0 : {}
  questionObj1 : {}
  questionObj2 : {}


  subscription : Subscription ;

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private routerToNavigate: Router, private service : ExamServiceService) { 
      this.subscription = router.params.subscribe(params => {
        this.token = params['token'];
        
        if(!this.token)
        {
          this.routerToNavigate.navigateByUrl('startExam/'+this.token);
        }   
        else {

        this.service.getQuestionForStudent(this.token).subscribe(result => {
          if(result.success == true){
            this.isValid =true;
            // result.forEach( function(el, index){
            //   el['name_of_answer'] = 'answer_'+index;
            //   this.data[index]= el;
            // })
            this.questionObj0 = result.exam.questions[0].question;
            this.questionObj1= result.exam.questions[1].question;
            this.questionObj2 =result.exam.questions[2].question;

            this.data = result;
            
          }
        }, 
        error => {
          console.log(error);
        },
        () =>
        {

        });
        }   
      })
      
    }
    
    ngOnInit() {
      this.createForm();
    }
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
    onClickStart(){
      this.routerToNavigate.navigateByUrl('startExam/'+this.token);
    }
    

    createForm() {
      this.questionsForm = this.formBuilder.group({
        'questionsData' : this.formBuilder.group({
          'answer_0': [''],
          'answer_1': [''],
          'answer_2': ['']
          
        }) 
      });
     
    this.questionsForm.valueChanges.subscribe(
      (data: any) => {
        console.log("Value changed: "+data);
        // console.log("answer 1 value "+this.questionsForm.get('questionsData').get('answer_0').value);
      }
    );
    }
    getAnswerControlName(i:number){
      // console.log("i value = "+i)
      return 'answer_'+i;

    }

    keyUpEvent(event){
      console.log('key up '+event.target.value +" id "+event.target.id );

    }
    onSubmit(){
      console.log('submitted' );
      let data = {token: this.token, answer_0: this.questionsForm.get('questionsData').get('answer_0').value
      , answer_1: this.questionsForm.get('questionsData').get('answer_1').value
      , answer_2: this.questionsForm.get('questionsData').get('answer_2').value};
      this.service.submitAnswers(data).subscribe(
        result => {
          if(result.success){
            this.routerToNavigate.navigateByUrl('/');
          }
        },
        error => {

        }
      )

    }

}
