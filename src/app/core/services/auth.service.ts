import { Inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

type LoginResponse = {
  jwt_token: string,
  expires_at: string
};

type RegisterResponse = {
  message: string
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
    if (this.isLoggedIn()) {
      this.userService.updateCurrentUserInfo$().subscribe();
    } else {
      this.logout();
    }
  }

  login$(password: string, email: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
      password,
      email,
    }).pipe(
      tap(res => AuthService.setSession(res)),
      switchMap(() => this.userService.updateCurrentUserInfo$(),
      ),
    );
  }

  register$(password: string, email: string, userName: string, age?:number): Observable<RegisterResponse> {
    const body = {
      password,
      email,
      userName,
      ...(age && { age }),
    };
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/auth/register`,
      body,
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn() {
    const EXPIRATION = Number(localStorage.getItem('expires_at'));
    const JWT_TOKEN = localStorage.getItem('jwt_token');
    return EXPIRATION > Date.now() && !!JWT_TOKEN;
  }

  private static setSession({ jwt_token, expires_at }: LoginResponse) {
    localStorage.setItem('jwt_token', jwt_token);
    localStorage.setItem('expires_at', String(new Date(expires_at).valueOf()));
  }
}
