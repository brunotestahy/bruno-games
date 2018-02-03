import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-stars',
    template: `
    <div class="stars">
      <app-star
        *ngFor="let star of stars"
        [active]="star <= _rating"
        (rate)="onRate($event)"
        [position]="star">
      </app-star>
    </div>
  `
})
export class StarsComponent {
    @Output() rate = new EventEmitter();
    stars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    @Input() _rating: number;
    @Input() videoId;

    constructor() {
    }

    // Mark the clicked star
    onRate(star) {
        this.rate.emit(star);
        this._rating = star;
    }
}
