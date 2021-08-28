import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  currentUserInfo$: ReplaySubject<CurrentUser> = new ReplaySubject<CurrentUser>(1);

  queryResult$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  queryChange$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private usersService: UsersService,
    private currentUserService: UserService,
  ) {}

  ngOnInit() {
    combineLatest([
      this.currentUserService.getCurrentUserInfo$(),
      this.queryChange$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        tap(([currentUserInfo]) => {
          this.currentUserInfo$.next(currentUserInfo);
        }),
        switchMap(([currentUserInfo, query]) => this.updateQueryResult$(currentUserInfo, query)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  get friendRequests$() {
    return this.currentUserInfo$.pipe(
      map(user => user.friendRequests.filter(r => r.from._id !== user._id)),
    );
  }

  onSearchInput(query: string) {
    this.queryChange$.next(query.trim());
  }

  onAddFriend(friendId: string) {
    this.usersService.createFriendRequest$(friendId).pipe(takeUntil(this.destroy$)).subscribe();
  }

  onRemoveFriend(friendId: string) {
    this.usersService.removeFriend$(friendId).pipe(takeUntil(this.destroy$)).subscribe();
  }

  onAcceptRequest(requestId: string) {
    this.usersService.acceptFriendRequest$(requestId).pipe(takeUntil(this.destroy$)).subscribe();
  }

  onDeclineRequest(requestId: string) {
    this.usersService.declineFriendRequest$(requestId).pipe(takeUntil(this.destroy$)).subscribe();
  }

  isRequestSent$(userId: string) {
    return this.currentUserInfo$.pipe(
      map(user => user.friendRequests.some(request => {
        const fromId = request.from._id;
        const toId = request.to._id;

        return fromId === userId || toId === userId;
      }),
      ),
    );
  }

  private updateQueryResult$(currentUserInfo: CurrentUser, query: string) {
    return this.usersService.getAllUsers$(query)
      .pipe(
        map((users) => this.filterUsers(users, currentUserInfo)),
        tap(users => this.queryResult$.next(users)),
      );
  }

  /*
  * Deletes friends and current user from users
  */
  private filterUsers(users: User[], currentUserInfo: CurrentUser) {
    return users.filter(user => {
      const userId = user._id;
      return currentUserInfo.friends.every((friend) => friend._id !== userId)
            && userId !== currentUserInfo._id;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
