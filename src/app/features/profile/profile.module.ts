import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileEditComponent,
    ToggleButtonComponent,
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
  ],
})
export class ProfileModule { }
