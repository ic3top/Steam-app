import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  editProfileForm: FormGroup = this.fb.group({
    email: ['email', Validators.email],
    userName: ['userName',
      [Validators.minLength(2), Validators.maxLength(24), Validators.required],
    ],
    age: [
      'age',
      [Validators.max(100), Validators.min(6), Validators.pattern('[0-9]{1,2}')],
    ],
  });

  formInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.userService.getCurrentUserInfo$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((profileInfo) => {
        this.editProfileForm.patchValue({
          email: profileInfo.email,
          userName: profileInfo.userName,
          age: profileInfo.age,
        });
      });
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      const { userName, email, age } = this.editProfileForm.value;

      this.userService.editUserInfo$(email, userName, age)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.router.navigate(['/profile/info']);
          },
          error: () => {
            this.formInvalid = true;
            this.cd.markForCheck();
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
