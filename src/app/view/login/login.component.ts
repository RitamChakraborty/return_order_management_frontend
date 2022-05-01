import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login-service/login.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  handleLogin(e: Event) {
    e.preventDefault();
    this.loginService
      .login("ritam@gmail.com", "password")
      .subscribe((value) => {
        console.log(value.access_token);
      });
  }
}
