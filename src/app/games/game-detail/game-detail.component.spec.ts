import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { GameDetailComponent } from './game-detail.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {CacheService} from '../../shared/services/cache.service';
import {GameService} from '../../shared/services/game.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {mockActivatedRoute, mockCacheService, mockGameService} from '../../../mocks';
import {Observable} from 'rxjs/Observable';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailComponent ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: CacheService, useValue: mockCacheService},
        {provide: GameService, useValue: mockGameService},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getCategoryFromRoute', () => {
    let cacheService;
    let gameService;
    let activatedRoute;
    beforeEach(() => {
      cacheService = fixture.debugElement.injector.get(CacheService);
      gameService = fixture.debugElement.injector.get(GameService);
      activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    });

    it('should get the correct game by id and save it on the cache service', () => {
      spyOn(gameService, 'getGameById').and.returnValue(Observable.of({data: 'data'}));
      spyOn(cacheService, 'setCachedValue');

      component.getGameFromRoute();

      expect(component.isLoading).toBeFalsy();
      expect(component.selectedGame).toEqual({data: 'data'});
      expect(cacheService.setCachedValue).toHaveBeenCalledWith('selected-game', component.selectedGame);
    });

    it('should get an error trying to get the game by id', () => {
      spyOn(gameService, 'getGameById').and.returnValue(Observable.throw({error: 'data'}));

      component.getGameFromRoute();

      expect(component.isLoading).toBeFalsy();
    });

    it('shoul back to the previous page', () => {
      spyOn(window.history, 'back');

      component.backToPreviousPage();

      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
