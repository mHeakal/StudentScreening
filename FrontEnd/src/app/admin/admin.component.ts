import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
