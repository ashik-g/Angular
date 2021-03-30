import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { Login } from '../shared/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser?: Login;
  usern:any;

  //loginUser:user

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //create a reactive form
    this.loginForm = this.fb.group({
      fullname: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  //get controls for validation
  get formControls() {
    return this.loginForm.controls;
  }


  //login verify
  loginsCredentials() {
    this.isSubmitted = true;

    //form is invalid
    if (this.loginForm.invalid)
      return;

    //form is valid
    if (this.loginForm.valid) {
      //calling method from service
      this.authService.loginVerify(this.loginForm.value).subscribe(
        data => {
          console.log(data);

          //checking rolebased authentication
          if (data.userType === "admin") {
            //this.usern=data.fullname;
            // localStorage.setItem("username",data.username);
            // sessionStorage.setItem("username",data.username);
            // //localStorage.setItem("ACCESS_ROLE",data..toString());
            this.router.navigateByUrl('/admin');
          }
          else if (data.userType === "manager") {
           // sessionStorage.setItem("username",data.fullname);
            this.router.navigateByUrl('/manager');
          }
          else if (data.userType === "user") {
            // sessionStorage.setItem("username",data.fullname);
             this.router.navigateByUrl('/user');
           }
          else {
            this.error = "Sorry...This Role is not Allowed To Access";
          }
        },
        error => {
          this.error = "Invalid username and password";
        });
    }
    return 
  }

}
