import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AddStaffDialogComponent } from './add-staff-dialog/add-staff-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // {path: 'admin/staff', component: StaffListComponent},
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'staff', component: StaffListComponent}, //canActivate : [MyActivateGuard] }
      { path: 'staff/add-staff', component: AddStaffDialogComponent }//, canActivate : [MyActivateGuard] }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StaffListComponent,
    AddStaffDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
