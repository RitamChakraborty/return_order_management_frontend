import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private static readonly JWT_TOKEN: string = "JWT_TOKEN";

  constructor() {
  }

  get jwtToken(): string | null {
    return localStorage.getItem(LocalStorageService.JWT_TOKEN);
  }

  set jwtToken(jwtToken: string | null) {
    localStorage.setItem(LocalStorageService.JWT_TOKEN, jwtToken!);
  }
}
