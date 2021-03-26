import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignIn } from '../models/sign-in.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

const textRequestOptions: Object = {
  responseType: 'text',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  signIn(data: SignIn): Observable<string> {
    let params = new HttpParams();
    params = params.append('username', data.username);
    params = params.append('password', data.password);

    return this.http
      .get<string>(environment.url.tabletopApi + '/v1/authentication/sign-in', {
        params,
        ...textRequestOptions
      })
      .pipe(tap((token) => (this.tokenService.token = token)));
  }

  signOut() {
    this.tokenService.token = null;
  }
}
