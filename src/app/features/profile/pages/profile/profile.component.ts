import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnDestroy {
  private sub: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  get currentUserInfo$() {
    return this.userService.getCurrentUserInfo$();
  }

  get isInfoOpened() {
    return this.router.url.includes('/info');
  }

  onDeleteClick() {
    this.sub = this.userService.deleteUser$().subscribe(() => {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
