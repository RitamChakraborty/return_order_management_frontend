import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login-service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) {
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
