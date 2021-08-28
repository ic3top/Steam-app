import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, pluck, switchMap, tap } from 'rxjs/operators';
import { Store } from './store';


@Injectable({
  providedIn: 'root',
})
export class UserService extends Store<CurrentUser> {
  constructor(private http: HttpClient) {
    super();
  }

  getCurrentUserInfo$(): Observable<CurrentUser> {
    return this.getState$()
      .pipe(
        pluck('entities'),
        map(({ currentUserInfo }) => currentUserInfo),
        filter(val => !!val),
      );
  }

  fetchUserInfo$() {
    return this.http.get<{ user: CurrentUser }>('https://cryptic-stream-35838.herokuapp.com/steam/profile/me')
      .pipe(
        map(({ user }) => user),
      );
  }

  deleteUser$() {
    return this.http.delete('https://cryptic-stream-35838.herokuapp.com/steam/profile/me');
  }

  editUserInfo$(email: string, userName: string, age?: number) {
    const body = {
      email,
      userName,
      ...(age && { age }),
    };
    return this.http.patch('https://cryptic-stream-35838.herokuapp.com/steam/profile/me', body)
      .pipe(switchMap(() => this.updateCurrentUserInfo$()));
  }

  updateCurrentUserInfo$() {
    return this.fetchUserInfo$().pipe(
      tap(currentUserInfo => this.setState({
        entities: { currentUserInfo },
      }),
      ),
      catchError((err) => {
        if (err.status === 401) {
          console.log('Unauthorized user');
        }
        return of({});
      }),
    );
  }
}
