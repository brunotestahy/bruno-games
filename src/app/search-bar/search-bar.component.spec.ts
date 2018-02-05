import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import {GameService} from '../shared/services/game.service';
import {mockCacheService, mockGameService} from '../../mocks';
import {CacheService} from '../shared/services/cache.service';
import {FormsModule} from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: CacheService, useValue: mockCacheService},
        {provide: GameService, useValue: mockGameService}
      ]
    })
    .compileComponents();
  }));

  let gameService;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    gameService = fixture.debugElement.injector.get(GameService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSearchValueChange method and emit the typed value in the input', () => {
    spyOn(gameService, 'emitSearchBarValueChange');

    component.onSearchValueChange('test');

    expect(gameService.emitSearchBarValueChange).toHaveBeenCalledWith('test');
  });
});
