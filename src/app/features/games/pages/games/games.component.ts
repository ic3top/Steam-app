import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  GENRES = [GameGenres.RPG, GameGenres.Strategy, GameGenres.Action, GameGenres.Indie, GameGenres.Adventure];

  games$: Subject<Game[]> = new Subject<Game[]>();

  filterChange$: Subject<{ maxPrice: number, genres: GameGenres[] }> = new Subject();

  searchInput$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
  ) {}

  ngOnInit() {
    combineLatest([this.searchInput$, this.filterChange$]).pipe(
      switchMap(([searchString, filters]) => this.gamesService.getAllGames$(searchString, filters.maxPrice, filters.genres)),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(games => this.games$.next(games));
  }

  onSearchInput(query: string) {
    this.searchInput$.next(query.trim());
  }

  onChangeFilters(activeFilters: { maxPrice: number, genres: GameGenres[] }) {
    this.filterChange$.next(activeFilters);
  }

  addGameToLibrary(gameId: string) {
    this.gamesService.addGameToLibrary$(gameId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  isInLibrary$(gameId: string) {
    return this.gamesService.isGameInLibrary$(gameId);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
