import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  @Output() logout = new EventEmitter<void>();

  @Input() isLoggedIn: boolean = false;

  @Input() userName?: string;

  @Input() requestsAmount?: number;
}
