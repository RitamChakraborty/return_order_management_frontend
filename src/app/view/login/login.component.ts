import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login-service/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
}
