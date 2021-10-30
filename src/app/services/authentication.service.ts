import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('/api/users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          const { acess_token } = token;
          localStorage.setItem('blog-token', acess_token);
          return token;
        })
      );
  }
}
