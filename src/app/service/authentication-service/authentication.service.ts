import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWTToken} from "../../model/jwttoken";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user";
import {LocalStorageService} from "../local-storage-service/local-storage.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {NewCustomer} from "../../model/new-customer";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
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

  login(username: string, password: string): Observable<JWTToken> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post<JWTToken>(
      `${environment.apiUrl}/login`,
      body.toString(),
      options
    );
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

  signup(newCustomer: NewCustomer): Observable<User> {
    return this.httpClient.post<User>(
      environment.apiUrl + '/signup',
      newCustomer
    );
  }
}
