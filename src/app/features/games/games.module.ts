import { NgModule } from '@angular/core';
import { GamesComponent } from './pages/games/games.component';
import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FiltersComponent } from './components/filters/filters.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { AddButtonComponent } from './components/add-button/add-button.component';

@NgModule({
  declarations: [
    GamesComponent,
    FiltersComponent,
    GameDetailsComponent,
    AddButtonComponent,
  ],
  imports: [
    GamesRoutingModule,
    SharedModule,
  ],
})
export class GamesModule { }
