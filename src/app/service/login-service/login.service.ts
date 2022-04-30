import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JWTToken} from "../../model/jwttoken";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<JWTToken> {
    let body = new URLSearchParams();
    body.set('user', username);
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
}
