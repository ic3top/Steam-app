import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../../../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private currentUserService: UserService,
    @Inject('BASE_URL') private baseUrl: string,
  ) { }

  getAllUsers$(query: string = ''): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}/users?search=` + query)
      .pipe(
        map(({ users }) => users),
      );
  }

  createFriendRequest$(friendId: string) {
    return this.http.post(`${this.baseUrl}/friends`, { to: friendId })
      .pipe(switchMap(() => this.updateState$()));
  }

  acceptFriendRequest$(requestId: string) {
    return this.http.patch(`${this.baseUrl}/friends/accept`, { requestId })
      .pipe(switchMap(() => this.updateState$()));
  }

  declineFriendRequest$(requestId: string) {
    return this.http.delete(`${this.baseUrl}/friends/decline`, { body: { requestId } })
      .pipe(switchMap(() => this.updateState$()));
  }

  removeFriend$(friendId: string) {
    return this.http.delete(`${this.baseUrl}/friends`, { body: { friendId } })
      .pipe(switchMap(() => this.updateState$()));
  }

  private updateState$() {
    return this.currentUserService.updateCurrentUserInfo$();
  }
}
