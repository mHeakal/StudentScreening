import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.css']
})
export class AddStaffDialogComponent implements OnInit {

  staffForm: FormGroup;

  ngOnInit() {
  }
  constructor(private formBuilder: FormBuilder) {

    this.staffForm = formBuilder.group({
      'userdata' : formBuilder.group({
        'name': ['', [Validators.required, this.nameValidator]],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]]
        // 'password': ['', Validators.required]
      }) 
    });
   
  this.staffForm.valueChanges.subscribe(
    (data: any) => console.log("Value changed: "+data)
  );

  }

  nameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === '') {
      return { name: true };
    }
    return null;
  }



}
