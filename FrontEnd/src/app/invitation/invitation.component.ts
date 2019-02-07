import { Component, OnInit } from '@angular/core';
import { InvitationService, Student } from '../services/invitation.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

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
  constructor(private invitationService: InvitationService) { }

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

}
