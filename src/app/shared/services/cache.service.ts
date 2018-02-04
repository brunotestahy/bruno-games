import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  constructor() { }

  getCachedValue(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setCachedValue(key: string, object: any) {
    sessionStorage.setItem(key, JSON.stringify(object));
  }
}
