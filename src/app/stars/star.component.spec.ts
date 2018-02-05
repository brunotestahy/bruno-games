import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StarComponent } from './star.component';

describe('StarComponent', () => {
   let component: StarComponent;
   let fixture: ComponentFixture<StarComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StarComponent]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });

   it('should execute handleRate method correctly and emit the event', fakeAsync(() => {
      spyOn(component.rate, 'emit').and.callThrough();
      component.handleRate();
      tick(5000);
      expect(component.rate.emit).toHaveBeenCalled();
   }));
});
