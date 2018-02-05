import { TestBed, inject } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
  });

  it('should be created', inject([CacheService], (service: CacheService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the correct cached value', inject([CacheService], (service: CacheService) => {
    spyOn(JSON, 'parse').and.returnValue('');

    service.getCachedValue('test');

    expect(JSON.parse).toHaveBeenCalledWith(sessionStorage.getItem('test'));
  }));

  it('should set the correct cached value', inject([CacheService], (service: CacheService) => {
    spyOn(sessionStorage, 'setItem');

    service.setCachedValue('test', {});

    expect(sessionStorage.setItem).toHaveBeenCalledWith('test', JSON.stringify({}));
  }));
});
