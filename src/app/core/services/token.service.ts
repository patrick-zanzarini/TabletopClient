import { Injectable } from '@angular/core';

const TOKEN_NAME = 'token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  get token(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  set token(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }
}
