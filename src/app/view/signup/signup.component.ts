import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication-service/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm?: FormGroup;
  signupError?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = formBuilder.group({
      firstName: ['', [Validators.required, Validators.max(30)]],
      lastName: ['', [Validators.required, Validators.max(30)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/g)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/g)]]
    })
  }

  ngOnInit(): void {
  }

  get firstName() {
    return this.signupForm?.get('firstName');
  }

  get lastName() {
    return this.signupForm?.get('lastName');
  }

  get contactNumber() {
    return this.signupForm?.get('contactNumber');
  }

  get email() {
    return this.signupForm?.get('email');
  }

  get password() {
    return this.signupForm?.get('password');
  }

  signup() {
    this.authenticationService
      .signup(this.signupForm?.value)
      .subscribe(
        (result) => {
          console.log(result);
        }, (e: HttpErrorResponse) => {
          if (e.status === 400) {
            this.signupError = "Customer already exists, please sign in";
          }
        }, () => {
          this.signupError = "";
        }
      );
  }

  cancel() {
    this.router.navigate(["login"]);
  }
}
