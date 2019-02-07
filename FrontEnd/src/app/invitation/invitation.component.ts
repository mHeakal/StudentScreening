import { Component, OnInit, Injectable } from '@angular/core';
import { InvitationService, Student } from '../services/invitation.service';
import {Subject, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CheckUserService } from '../check-user.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  private students: Student[];
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;
  constructor(private invitationService: InvitationService,private routerToNavigate: Router){ }

  ngOnInit() {
    this.getAllStudents();
    //Self closing alert message.
    setTimeout(() => this.staticAlertClosed = true, 200);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessage = null);
  }

  getAllStudents(){
    this.invitationService.getAllStudents().subscribe(result => {
      this.students = result;
    });
  }

  sendInvitation(student){
    //console.log(student);
    this.invitationService.sendInvitation(student).subscribe(result => {
      //console.log("Invitation:"+ JSON.stringify(result));
      this.getAllStudents();
      this._success.next(`Invitation successfully sent.`);
    });
  }


  signOut() {

    localStorage.removeItem('user');
    localStorage.clear();
    this.routerToNavigate.navigateByUrl('/');

  }

}




@Injectable()
export class StaffGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private r:Router, private dataservice: CheckUserService ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
 
    // let role = this.dataservice.isAuthenticatedForAdminRoute('admin');
    if(this.dataservice.isAuthenticated('staff')) {
     return true
   }else{
    this.r.navigate([''])
   }

   return false;

  }
}
