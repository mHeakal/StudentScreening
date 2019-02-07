import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AceEditorModule } from 'ng2-ace-editor';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent, MyActivateGuard } from './admin/admin.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AddStaffDialogComponent } from './add-staff-dialog/add-staff-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionService } from './services/question.service';
import { ExamComponent } from './student/exam/exam.component';
import { StartexamComponent } from './student/startexam/startexam.component';
import { StaffComponent } from './staff/staff.component';
import { ExamServiceService } from './services/exam-service.service';
import { InvitationComponent, StaffGuard } from './invitation/invitation.component';
import { InvitationService } from './services/invitation.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ThankyouComponent } from './student/thankyou/thankyou.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // {path: 'admin/staff', component: StaffListComponent},
  {
    path: 'admin', component: AdminComponent, canActivate : [MyActivateGuard],
    children: [
      { path: 'staff', component: StaffComponent}, //canActivate : [MyActivateGuard] }
      { path: 'questions', component: QuestionsComponent}, //canActivate : [MyActivateGuard] }
      // { path: 'staff/add-staff', component: AddStaffDialogComponent }//, canActivate : [MyActivateGuard] }
    ]
  }, 
  {
    path:'exam/:token', component: ExamComponent
    // ,
    // children: [
    //   { path: 'start', component: StartexamComponent}
    // ]
  },
  { path: 'startExam/:token', component: StartexamComponent},
  { path: 'staff', component: InvitationComponent,canActivate : [StaffGuard]
},
{ path: 'thankyou', component: ThankyouComponent},
{ path: '404', component: NotFoundComponent },
{ path: '**', redirectTo: '404' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StaffListComponent,
    AddStaffDialogComponent,
    QuestionsComponent,
    ExamComponent,
    StartexamComponent,
    StaffComponent,
    InvitationComponent,
    NotFoundComponent,
    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    UiSwitchModule,
    AceEditorModule

    ],
  providers: [QuestionService, ExamServiceService, InvitationService, MyActivateGuard, StaffGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
