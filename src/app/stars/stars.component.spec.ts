import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StarsComponent } from './stars.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

fdescribe('StarsComponent', () => {
   let component: StarsComponent;
   let fixture: ComponentFixture<StarsComponent>;
   const _http: Http = new Http(new MockBackend(), new RequestOptions);

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [],
         declarations: [StarsComponent],
         schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StarsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });

   it('should call the onRate method, emit a event and pass the correct clicked start index', fakeAsync(() => {
      const startIndex = 2;
      component.videoId = '1234';
      spyOn(component.rate, 'emit').and.callThrough();
      component.onRate(startIndex);
      tick(5000);
      expect(component.rate.emit).toHaveBeenCalledWith(startIndex);
      expect(component._rating).toEqual(startIndex);
   }));
});
