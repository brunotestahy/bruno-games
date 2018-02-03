import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-star',
    template: `<span class="star" [class.active]="active" (click)="handleRate()">&#9733;</span>`,
    styles: [`
    .star {
      color: rgb(160, 157, 157);
      cursor: pointer;
      font-size: 1.5rem;
      transition: color .4s ease-in-out;
    }
    .star.active {
      color: #FFD600;
    }
  `]
})
export class StarComponent {
    @Input() active: boolean;
    @Input() position: number;
    @Output() rate = new EventEmitter();

    // Save the position of the clicked star
    handleRate() {
        this.rate.emit(this.position);
    }
}
