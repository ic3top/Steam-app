import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GamesComponent,
  },
  {
    path: ':gameId',
    component: GameDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {  }
