import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { LoaderComponent } from './components/loader/loader.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderService } from './services/loader.service';



@NgModule({
  declarations: [
    HeaderComponent,
    UserButtonComponent,
    LoaderComponent,
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HeaderComponent,
    UserButtonComponent,
    LoaderComponent,
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'BASE_URL', useValue: 'https://cryptic-stream-35838.herokuapp.com/steam' }
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only',
      );
    }
  }
}
