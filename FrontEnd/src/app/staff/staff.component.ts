import { Component, OnInit, Injectable } from '@angular/core';
import { StaffService, Staff } from '../services/staff.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CheckUserService } from '../check-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  private staffs: Staff[];
  staffForm: FormGroup;
  roleTypes = ['Admin', 'Staff'];
  private selectedRole;
  constructor(private staffService: StaffService, private modalService: NgbModal) { 
    this.staffForm = this.createStaffFormGroup();
  }

  ngOnInit() {
    this.getAllStaff();
    this.selectedRole = this.roleTypes[0];
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmit(){
    const staff: Staff = Object.assign({},this.staffForm.value);
    this.insertStaff(staff);
  }

  createStaffFormGroup(){
    return new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      //password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)])),
      role: new FormControl('', Validators.required),
      status: new FormControl(false)
    });
  }

  getAllStaff(){
    this.staffService.getAllStaff().subscribe(result => {
      this.staffs = result;
    });
  }

  insertStaff(staff:Staff){
    this.staffService.insertStaff(staff).subscribe(result =>{
      //console.log("Add Staff: " + JSON.stringify(result));
      this.staffForm.reset();
      this.getAllStaff();
      this.selectedRole = this.roleTypes[0];
    });
  }

  deleteStaff(staff:Staff){
    this.staffService.deleteStaff(staff).subscribe(result =>{
      //console.log("Deleted Staff: " + JSON.stringify(result));
      this.getAllStaff();
    });
  }

  updateStaffStatus(staff:Staff){
    this.staffService.updateStaffStatus(staff).subscribe(result =>{
      //console.log("Update Staff status: " + JSON.stringify(result));
    });
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
