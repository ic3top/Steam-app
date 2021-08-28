import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Input() labelText: string = 'Search query';

  @Output() queryInput = new EventEmitter<string>();

  private queryChanged = new Subject<string>();

  private sub!: Subscription;

  searchForm: FormGroup = this.fb.group({
    query: [''],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.sub = this.queryChanged
      .pipe(
        debounceTime(500),
      )
      .subscribe((query) => {
        this.queryInput.emit(query);
      });
  }

  onInput() {
    this.queryChanged.next(this.searchForm.value.query);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
