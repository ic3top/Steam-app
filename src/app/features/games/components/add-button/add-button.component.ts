import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  @Input() isInLibrary: boolean | null = false;

  @Input() fullWidth: boolean = false;

  @Output() addToLibrary = new EventEmitter();
}
