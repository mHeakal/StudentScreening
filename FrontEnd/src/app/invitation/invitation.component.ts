import { Component, OnInit } from '@angular/core';
import { InvitationService, Student } from '../services/invitation.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  private students: Student[];
  constructor(private invitationService: InvitationService) { }

  ngOnInit() {
    this.getAllStudents();
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
    });
  }

}
