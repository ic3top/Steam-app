import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInfoComponent implements OnInit {
  profileInfo$!: Observable<CurrentUser>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: UserService,
  ) { }

  ngOnInit() {
    this.profileInfo$ = this.authService.getCurrentUserInfo$();
  }
}
