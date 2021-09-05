import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {

  @Input() isInfoOpened: boolean = false;

}
