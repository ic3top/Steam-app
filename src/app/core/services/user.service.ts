import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Store } from './store';

interface ResMessage { message: string }

@Injectable({
  providedIn: 'root',
})
export class UserService extends Store<CurrentUser> {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
    super();
  }

  getCurrentUserInfo$(): Observable<CurrentUser> {
    return this.getState$()
      .pipe(
        map(({ entities: { currentUserInfo } }) => currentUserInfo),
        filter(val => !!val),
      );
  }

  fetchUserInfo$(): Observable<CurrentUser> {
    return this.http.get<{ user: CurrentUser }>(`${this.baseUrl}/profile/me`)
      .pipe(
        map(({ user }) => user),
      );
  }

  deleteUser$(): Observable<ResMessage> {
    return this.http.delete<ResMessage>(`${this.baseUrl}/profile/me`);
  }

  editUserInfo$(email: string, userName: string, age?: number): Observable<CurrentUser | {}> {
    const body = {
      email,
      userName,
      ...(age && { age }),
    };
    return this.http.patch(`${this.baseUrl}/profile/me`, body)
      .pipe(switchMap(() => this.updateCurrentUserInfo$()));
  }

  updateCurrentUserInfo$(): Observable<CurrentUser | {}> {
    return this.fetchUserInfo$().pipe(
      tap(currentUserInfo => this.setState({
        entities: { currentUserInfo },
      }),
      ),
      catchError((err) => {
        if (err.status === 401) {
          console.warn('Unauthorized user');
        }
        return of({});
      }),
    );
  }
}
