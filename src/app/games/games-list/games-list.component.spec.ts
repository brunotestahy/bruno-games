import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListComponent } from './games-list.component';
import {mockActivatedRoute, mockCacheService, mockGameService} from '../../../mocks';
import {GameService} from '../../shared/services/game.service';
import {CacheService} from '../../shared/services/cache.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FilterPipe} from '../../shared/pipes/filter.pipe';
import {Observable} from 'rxjs/Observable';

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterPipe,
        GamesListComponent
      ],
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

  let cacheService;
  let gameService;
  let activatedRoute;

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    component.gameCategory = {
      _embedded: {
        games: []
      },
      _links: {
        self: {
          href: ''
        }
      },
      name: '',
      slug: '',
      order: 0
    };
    fixture.detectChanges();
    cacheService = fixture.debugElement.injector.get(CacheService);
    gameService = fixture.debugElement.injector.get(GameService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit',  () => {
    it('should call getCategoryFromRoute if the gameCategory is null', () => {
      spyOn(component, 'getCategoryFromRoute');

      component.gameCategory = null;
      component.ngOnInit();

      expect(component.getCategoryFromRoute).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy',  () => {
    it('should call unloadGeneralListeners and saveLoadMoreState methods', () => {
      spyOn(component, 'unloadGeneralListeners');
      spyOn(component, 'saveLoadMoreState');

      component.ngOnDestroy();

      expect(component.unloadGeneralListeners).toHaveBeenCalled();
      expect(component.saveLoadMoreState).toHaveBeenCalled();
    });
  });

  describe('unloadGeneralListeners',  () => {
    it('should call unloadGeneralListeners and unsubscribe the listeners', () => {
      component.onSearchValueChangeSubscription = Observable.of({}).subscribe();
      component.onGameCategoryChangeSubscription = Observable.of({}).subscribe();
      spyOn(component.onSearchValueChangeSubscription, 'unsubscribe');
      spyOn(component.onGameCategoryChangeSubscription, 'unsubscribe');

      component.unloadGeneralListeners();

      expect(component.onSearchValueChangeSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.onGameCategoryChangeSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('getCategoryFromRoute', () => {
    it('should get the category and save it on the cache service', () => {
      spyOn(gameService, 'getGamesByCategory').and.returnValue(Observable.of({data: 'data'}));
      spyOn(cacheService, 'setCachedValue');

      component.getCategoryFromRoute();

      expect(component.isLoading).toBeFalsy();
      expect(component.gameCategory).toEqual({data: 'data'});
      expect(cacheService.setCachedValue).toHaveBeenCalledWith('game-category', component.gameCategory);
    });

    it('should get an error trying to get the game category', () => {
      spyOn(gameService, 'getGamesByCategory').and.returnValue(Observable.throw({error: 'data'}));

      component.getCategoryFromRoute();

      expect(component.isLoading).toBeFalsy();
    });
  });

  describe('loadMoreGames', () => {
    it('should call the loadMoreGames method and increment by 12 the maxLoadedGames variable', () => {
      component.gameCategory._embedded.games = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

      component.loadMoreGames();

      expect(component.maxLoadedGames).toBe(24);
    });
  });
});
