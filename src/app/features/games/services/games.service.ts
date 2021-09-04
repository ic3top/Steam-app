import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, pluck, shareReplay, switchMap } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GamesService {

  constructor(
    private http: HttpClient,
    private currentUserService: UserService,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  getAllGames$(search: string = '', maxPrice: number, genres: GameGenres[]) {
    const searchQuery = `search=${search}`;
    const maxPriceQuery = `maxPrice=${maxPrice > 0 ? maxPrice : 100}`;
    const genresQuery = genres.map(genre => 'genres=' + genre).join('&');
    return this.http
      .get<{ games: Game[] }>(`${this.baseUrl}/games?${searchQuery}&${maxPriceQuery}&${genresQuery}`)
      .pipe(
        map(({ games }) => games),
      );
  }

  isGameInLibrary$(gameId: string) {
    return this.currentUserService.getCurrentUserInfo$()
      .pipe(
        map(user => user.games),
        map(games => games.some(({ _id }) => gameId === _id)),
        shareReplay(),
      );
  }

  getGameById$(gameId: string) {
    return this.http.get<{ game: Game }>(`${this.baseUrl}/games/` + gameId)
      .pipe(
        pluck('game'),
        shareReplay(),
      );
  }

  addGameToLibrary$(gameId: string) {
    return this.http.patch(`${this.baseUrl}/profile/me/games`, { gameId })
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            console.warn('You must log in');
            this.router.navigate(['/auth/login']);
          }
          return of({});
        }),
        switchMap(() => this.currentUserService.updateCurrentUserInfo$()),
      );
  }
}
