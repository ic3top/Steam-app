import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  game$!: Observable<Game>;

  gameId: string = '';

  isInLibrary$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
  ) {
    this.gameId = this.route.snapshot.paramMap.get('gameId')!;
  }

  ngOnInit() {
    this.game$ = this.gamesService.getGameById$(this.gameId);
    this.game$
      .pipe(takeUntil(this.destroy$))
      .subscribe({ error: () => this.router.navigate(['/404']) });

    this.isInLibrary$ = this.gamesService.isGameInLibrary$(this.gameId);
  }

  onAddToLibrary() {
    this.gamesService.addGameToLibrary$(this.gameId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
