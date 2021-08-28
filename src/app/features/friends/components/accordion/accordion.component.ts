import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

interface Panel {
  ref: TemplateRef<any>,
  header: string
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() panels: Panel[] = [];
}
