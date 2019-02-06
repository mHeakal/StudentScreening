import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { CheckUserService } from '../check-user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  private emailTimeout;

  constructor(private formBuilder: FormBuilder, private chechUser: CheckUserService,
    private router: Router) {
    this.myForm = formBuilder.group({
      'loginData': formBuilder.group({
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'password': ['', Validators.required]
      })
    });
    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onSubmit() {
    this.chechUser.isUserExist({
      email: this.myForm.get('loginData').get('email').value,
      password: this.myForm.get('loginData').get('password').value
    })
      .subscribe(
        response => {
          console.log(response);
          let resp = JSON.parse(JSON.stringify(response));
          // if (resp.results == 'admin') {
          //   this.router.navigateByUrl('admin');
          // }
          console.log(""+(resp.success == true));
          if(resp.success == true && resp.role.toLowerCase() == "admin" && resp.token){
            this.router.navigateByUrl('admin');
          }else if(resp.success == true && resp.role.toLowerCase() == "staff" && resp.token){
            this.router.navigateByUrl('staff');
          }

        },
        error => {
          console.log(error);
        },
        () => {
          console.log("Empty");
        }
      );
    // this.router.navigateByUrl('admin');//just for testing untill we connect successfully will be deleted after connecting
    console.log('submitted');
  }

  // asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
  //   console.log('submitted')
  //   clearTimeout(this.emailTimeout);
  //   return new Promise((resolve, reject) => {
  //     this.emailTimeout = setTimeout(() => {
  //       this.chechUser.isUserExist({ email: control.value ,password: control.value}).subscribe(
  //         response => resolve(null),
  //         error => resolve({ invalid: true }));
  //     }, (0));
  //   });
  // }

  ngOnInit() {
  }
}
