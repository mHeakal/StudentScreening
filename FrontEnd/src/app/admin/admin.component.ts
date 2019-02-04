import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tabNames= ["Staff", "Questions", "Answers"]
  // constructor(private tabNames) {
    // tabNames.push("Staff");
    // tabNames.push("Questions");
    // tabNames.push("Answers");
  //  }

  ngOnInit() {
  }
  currentTab:0;

  isActive(tabNumber) {
    return this.currentTab == tabNumber;
    
  }

  tabClicked(tabNumber){
    this.currentTab = tabNumber;
  }
}
