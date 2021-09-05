import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private sub: Subscription = new Subscription();

  isLoginInvalid: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { password, email } = this.loginForm.value;
      this.sub = this.authService.login$(password, email).subscribe(
        () => this.router.navigate(['/games']),
        () => {
          this.isLoginInvalid = true;
          this.cd.markForCheck();
        },
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
