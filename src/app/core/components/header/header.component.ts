import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() isDisplayed = false;

  currentUserInfo$!: Observable<CurrentUser>;

  constructor(
    public loaderService: LoaderService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentUserInfo$ = this.userService.getCurrentUserInfo$();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get requestsAmount$() {
    return this.currentUserInfo$.pipe(
      map(user => user.friendRequests.filter(({ to }) => to._id === user._id).length),
    );
  }

  get userName$() {
    return this.currentUserInfo$.pipe(
      map(user => user.userName),
    );
  }
}
