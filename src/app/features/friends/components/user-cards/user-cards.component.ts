import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardsComponent {
  @Input() users: User[] = [];

  @Input() actions!: TemplateRef<any>;
}
