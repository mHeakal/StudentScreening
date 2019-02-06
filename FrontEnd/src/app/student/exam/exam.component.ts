import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {
token="";
isValid = false;
subscription : Subscription ;
  constructor(private router: ActivatedRoute, private routerToNavigate: Router) { 
    this.subscription = router.params.subscribe(params => {
      this.token = params['token'];
      
      if(this.isValid)
      {
        this.routerToNavigate.navigateByUrl('startExam/'+this.token);
      }      
    })
  }

  ngOnInit() {

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onClickStart(){
    this.routerToNavigate.navigateByUrl('startExam/'+this.token);
  }


}
