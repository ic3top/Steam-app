import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  private sub: Subscription = new Subscription();

  isRegisterInvalid: boolean = false;

  registerForm: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
    age: ['', [Validators.max(100), Validators.min(3), Validators.pattern('[0-9]{1,2}')]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, email, userName, age } = this.registerForm.value;
      this.sub = this.authService.register$(password, email, userName, age)
        .subscribe(
          () => this.router.navigate(['auth/login']),
          () => {
            this.isRegisterInvalid = true;
            this.cd.markForCheck();
          },
        );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
