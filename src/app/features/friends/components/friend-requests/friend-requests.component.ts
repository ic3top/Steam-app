import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendRequestsComponent {
  @Input() friendRequests: FriendRequest[] = [];

  @Output() accept = new EventEmitter<string>();

  @Output() decline = new EventEmitter<string>();
}
