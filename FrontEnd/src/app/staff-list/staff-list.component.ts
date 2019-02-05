import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../services/staff-service.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
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
    this.staffService.changeStatus(user, user.is_active==true?'false':'true').subscribe(
      response => {
        console.log(response);
        let resp = JSON.parse(JSON.stringify(response));
        // if(resp.status == 200) {}
        let index = this.staffList.findIndex(x=>x['id']===user.id)

        if(resp.results) {
          // this.staffList = resp.results;
          this.staffList[index] = resp.results;
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
    return status === false?"Deactive": "Active";
  }

  getStatusToggle(status):String{
    return status === false?"Activate": "Deactivate";
  }
}
