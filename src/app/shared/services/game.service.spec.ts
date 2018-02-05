import {TestBed, inject} from '@angular/core/testing';

import {GameService} from './game.service';
import {HttpClient} from '@angular/common/http';
import {mockHttpClient} from '../../../mocks';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameService,
        {provide: HttpClient, useValue: mockHttpClient}
      ]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it('should getGameById correctly', inject([GameService, HttpClient], (service: GameService, httpService: HttpClient) => {
    spyOn(httpService, 'get').and.returnValue('');

    service.emitSearchBarValueChange('test');
    service.emitGameCategoryChange();
    service.getGameById('first');

    expect(httpService.get).toHaveBeenCalledWith(service.baseURL + 'games/first' + service.credentials);
  }));

  it('should getAllCategories correctly', inject([GameService, HttpClient], (service: GameService, httpService: HttpClient) => {
    spyOn(httpService, 'get').and.returnValue('');

    service.getAllCategories();

    expect(httpService.get).toHaveBeenCalledWith(service.baseURL + 'game-categories' + service.credentials);
  }));

  it('should getGamesByCategory correctly', inject([GameService, HttpClient], (service: GameService, httpService: HttpClient) => {
    spyOn(httpService, 'get').and.returnValue('');

    service.getGamesByCategory();

    expect(httpService.get).toHaveBeenCalledWith(service.baseURL + 'game-categories/popular-games' + service.credentials);
  }));
});
