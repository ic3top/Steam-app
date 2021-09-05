import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LibraryResolver implements Resolve<Game[]> {
  constructor(private userService: UserService) {}

  resolve(): Observable<Game[]> {
    return this.userService.fetchUserInfo$().pipe(
      map(({ games }) => games),
      first(),
    );
  }
}
