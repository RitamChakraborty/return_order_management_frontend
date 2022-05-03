import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login-service/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../../service/authentication-service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  loginError: string = '';

  constructor(
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {

  }

  get username() {
    return this.loginForm?.get('username');
  }

  get password() {
    return this.loginForm?.get('password');
  }

  login() {
    if (this.username && this.password) {
      this.loginService
        .login(this.username.value, this.password.value)
        .subscribe(
          jwtToken => {
            this.loginError = "";
            this.authenticationService
              .authenticate(jwtToken);
          },
          (e: HttpErrorResponse) => {
            if (e.status === 0) {
              this.loginError = "Check your internet connection";
            } else {
              this.loginError = "Incorrect username or password"
            }
          }
        );
    }
  }
}
