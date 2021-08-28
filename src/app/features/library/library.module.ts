import { NgModule } from '@angular/core';
import { LibraryComponent } from './pages/library/library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    LibraryComponent,
  ],
  imports: [
    LibraryRoutingModule,
    SharedModule,
    ClipboardModule,
  ],
})
export class LibraryModule { }
