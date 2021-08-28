import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Input() genres: GameGenres[] = [];

  @Output() changeFilters = new EventEmitter<{ maxPrice: number, genres: GameGenres[] }>();

  filtersForm: FormGroup = this.fb.group({
    maxPrice: [0],
    genresCheckboxes: this.fb.array(this.genres.map(() => true)),
  });

  anyGenreChecked: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.emitChangeFilters();
  }

  get genresCheckboxes() {
    return this.filtersForm.controls.genresCheckboxes;
  }

  get isAnyPrice() {
    const currentPrice = this.filtersForm.controls.maxPrice.value;
    return currentPrice === 0 || currentPrice === 100;
  }

  formatPrice(price: number) {
    if (price > 0) {
      return price + '$';
    }

    return price;
  }

  markAllGenres() {
    this.genresCheckboxes.setValue(this.genres.map(() => true));
    this.emitChangeFilters();
  }

  changeGenres() {
    this.anyGenreChecked = this.genresCheckboxes.value.every(Boolean);
    this.emitChangeFilters();
  }

  emitChangeFilters() {
    this.changeFilters.emit({
      maxPrice: this.filtersForm.value.maxPrice,
      genres: this.genres.filter((_, i) => this.genresCheckboxes.value[i]),
    });
  }
}
