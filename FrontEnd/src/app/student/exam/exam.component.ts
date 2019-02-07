import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamServiceService } from 'src/app/services/exam-service.service';
// import { ExamServiceService } from 'src/app/services/exam-service.service';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {
token="";
isValid = false;
subscription : Subscription ;
  constructor(private router: ActivatedRoute, private routerToNavigate: Router, private service: ExamServiceService ) { 
    this.subscription = router.params.subscribe(params => {
      this.token = params['token'];
      
      if(!this.token)
      {
        this.routerToNavigate.navigateByUrl('startExam/'+this.token);
      }
      else {
        
        this.service.studentAuthenticated(this.token).subscribe(result => {
          console.log(result);
          if(result.success == true){
            this.isValid =true;
           
          } else {
            this.routerToNavigate.navigateByUrl('/'+this.token);
          }
        }, 
        error => {
          console.log(error);
           this.routerToNavigate.navigateByUrl('/'+this.token);
        },
        () =>
        {

        });
      }      
    })
  }

  ngOnInit() {

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onClickStart(){
    if(this.isValid)
      this.routerToNavigate.navigateByUrl('startExam/'+this.token);
  }


}
