import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWTToken} from "../../model/jwttoken";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user";
import {LocalStorageService} from "../local-storage-service/local-storage.service";
import {Router} from "@angular/router";
import {LoginService} from "../login-service/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  private _isLoggedIn: boolean = false;

  get isLoggedIn(): boolean {
    const token: string | null = this.localStorageService.jwtToken;

    if (token) {
      this.authenticate({
        access_token: token
      });
    }

    return this._isLoggedIn;
  }

  private _user?: User;

  get user(): User {
    return this._user!;
  }

  authenticate(jwtToken: JWTToken) {
    const httpHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken.access_token}`
    });

    this.httpClient.get<User>(
      environment.apiUrl + "/authenticate",
      {
        headers: httpHeader
      }
    ).subscribe((user) => {
      this._isLoggedIn = true;
      this._user = user;
      this.localStorageService.jwtToken = jwtToken.access_token;
      this.router.navigate(['']);
    }, () => {
      this.logOut();
    })
  }

  logOut() {
    this._isLoggedIn = false;
    this.localStorageService.clear();
    this.router.navigate(["login"]);
  }
}
