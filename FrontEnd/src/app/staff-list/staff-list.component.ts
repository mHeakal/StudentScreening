import { Component, OnInit, Inject } from '@angular/core';
import { StaffServiceService } from '../services/staff-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  addStaffRoute = 'add-staff'
  staffList : [{}];
  constructor(private staffService : StaffServiceService) { 
    
    this.serviceCallStaffList(1);
    
  }

  ngOnInit() {
    
  }

  serviceCallStaffList(pageNumber : number){
    this.staffService.getStaffList(pageNumber).subscribe(
      response => {
        console.log(response);
        let resp = JSON.parse(JSON.stringify(response));
        // if(resp.status == 200) {}
        if(resp.data) {
          this.staffList = resp.data;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Empty");
      }
    )
  }

  changeStatusCall(user){
    console.log('changeStatusCall method called '+user);
    this.staffService.changeStatus(user, user.status=='active'?'Inactive':'active').subscribe(
      response => {
        console.log(response);
        let resp = JSON.parse(JSON.stringify(response));
        // if(resp.status == 200) {}
        let index = this.staffList.findIndex(x=>x['_id']===user._id)

        if(resp.success == true) {
          user.status = user.status=='active'?'Inactive':'active';
          this.staffList[index]=  user;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Empty");
      }
    )
  }


  getStatusString(status):String{
    // return status === false?"Deactive": "Active";
    return status;
  }

  getStatusToggle(status):String{
    return status === 'active'? "Deactivate":"Activate";
  }

  
  addStaffClicked(){
    
  }
}


