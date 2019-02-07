import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-startexam',
  templateUrl: './startexam.component.html',
  styleUrls: ['./startexam.component.css']
})
export class StartexamComponent implements OnInit, OnDestroy {
  token="";
  isValid = false;
  subscription : Subscription ;
    constructor(private router: ActivatedRoute, private routerToNavigate: Router) { 
      this.subscription = router.params.subscribe(params => {
        this.token = params['token'];
        
        if(!this.token)
        {
          this.routerToNavigate.navigateByUrl('startExam/'+this.token);
        }   
        else {
          
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
