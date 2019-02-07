import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CheckUserService } from '../check-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tabNames= ["Staff", "Questions", "Answers"]
  routes= ["staff", "questions", "answers"]
  // constructor(private tabNames) {
    // tabNames.push("Staff");
    // tabNames.push("Questions");
    // tabNames.push("Answers");
  //  }

  ngOnInit() {
  }
  currentTab:0;

  isActive(tabNumber) : boolean {
    console.log(tabNumber);
    return this.currentTab == tabNumber;
    
  }

  tabClicked(tabNumber){
    console.log(tabNumber);
    this.currentTab = tabNumber;
  }

  getClassName(tab: number) : String {
    console.log(tab+'CALLLED');
    return this.currentTab == tab ?'nav-link active':'nav-link';
  }

  getRouteName(tab : number){
    console.log(tab+'getRouteName');
    return this.routes[tab];
  }
}


@Injectable()
export class MyActivateGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private r:Router, private dataservice: CheckUserService ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
 
    // let role = this.dataservice.isAuthenticatedForAdminRoute('admin');
    if(this.dataservice.isAuthenticated('admin')) {
     return true
   }else{
    this.r.navigate([''])
   }

   return false;

  }
}
