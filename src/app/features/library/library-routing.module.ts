import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './pages/library/library.component';
import { LibraryResolver } from './resolvers/library.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LibraryComponent,
    resolve: {
      userGames: LibraryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {  }
