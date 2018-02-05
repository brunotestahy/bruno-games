import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {mockCacheService, mockGameService, mockRouter} from '../../mocks';
import {GameService} from '../shared/services/game.service';
import {CacheService} from '../shared/services/cache.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: Router, useValue: mockRouter},
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
  let routeService;

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.gameCategories = [
      {
        _embedded: {
          games: []
        },
        _links: {
          self: {
            href: ''
          }
        },
        order: 0,
        name: '',
        slug: ''
      }
    ];
    fixture.detectChanges();
    cacheService = fixture.debugElement.injector.get(CacheService);
    gameService = fixture.debugElement.injector.get(GameService);
    routeService = fixture.debugElement.injector.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadCategories and navigate to popular-games page', () => {
      spyOn(component, 'loadCategories');
      spyOn(routeService, 'navigate');

      component.gameCategories = null;
      component.ngOnInit();

      expect(component.loadCategories).toHaveBeenCalled();
      expect(routeService.navigate).toHaveBeenCalledWith(['games', 'popular-games']);
    });
  });

  describe('loadCategories', () => {
    it('should load the categories and save them on the cache service', () => {
      const observableSpy = spyOn(gameService, 'getAllCategories').and.returnValue(Observable.throw({error: 'data'}));
      spyOn(cacheService, 'setCachedValue');

      component.loadCategories();

      observableSpy.and.returnValue(Observable.of({_embedded: {game_categories: []}}));

      component.loadCategories();

      expect(cacheService.setCachedValue).toHaveBeenCalledWith('game-categories', component.gameCategories);
    });
  });

  describe('goToGameCategory', () => {
    it('should navigate to another game category', fakeAsync(() => {
      spyOn(routeService, 'navigate').and.returnValue(Promise.resolve());
      spyOn(gameService, 'emitGameCategoryChange');

      component.goToGameCategory('other-games');

      expect(routeService.navigate).toHaveBeenCalledWith(['games', 'other-games']);
      tick(5000);
      expect(gameService.emitGameCategoryChange).toHaveBeenCalled();
    }));
  });
});
