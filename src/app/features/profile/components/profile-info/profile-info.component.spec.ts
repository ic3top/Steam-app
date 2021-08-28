import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from './profile-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../../shared/shared.module';

describe('ProfileInfoComponent', () => {
  let component: ProfileInfoComponent;
  let fixture: ComponentFixture<ProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInfoComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, SharedModule ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
