import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent implements OnInit {
  currentUserGames: Game[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private docRef: typeof document,
  ) {}

  ngOnInit() {
    this.currentUserGames = this.activatedRoute.snapshot.data.userGames;
  }

  download(gameTitle: string) {
    alert(gameTitle + ' downloaded');
  }

  getGameLink(gameId: string) {
    return this.docRef.location.href.replace(/([a-z\d]+)(\/*|)$/i, `games/${gameId}`);
  }
}

