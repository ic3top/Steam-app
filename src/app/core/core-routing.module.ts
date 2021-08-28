import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'games',
    loadChildren: () => import('../features/games/games.module').then(m => m.GamesModule),
  },
  {
    path: 'library',
    loadChildren: () => import('../features/library/library.module').then(m => m.LibraryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'friends',
    loadChildren: () => import('../features/friends/friends.module').then(m => m.FriendsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('../features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('../features/not-found/not-found.module').then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
