// Mocks
import {Observable} from 'rxjs/Observable';
import {Game} from './app/shared/models/game';
import 'rxjs/add/observable/of';

export const mockActivatedRoute: any = {
  params: Observable.of({})
};

export const mockCacheService: any = {
  getCachedValue: (key: string) => {
  },
  setCachedValue: (key: string, value: any) => {
  }
};

export const mockGameService: any = {
  emitGameCategoryChange: () => {
  },
  emitSearchBarValueChange: (value: string) => {
  },
  getGameById: (): Observable<Game> => {
    return Observable.of({});
  },
  getAllCategories: (): Observable<Game> => {
    return Observable.of({});
  },
  getGamesByCategory: (): Observable<Game> => {
    return Observable.of({});
  },
  handleGameCategoryChange$: {
    subscribe: (): Observable<any> => {
      return Observable.of({});
    }
  },
  handleSearchBarValueChange$:
    {
      debounceTime: (): Observable<string> => {
        return Observable.of('');
      },
    }
};

export const mockHttpClient: any = {
  get: (): Observable<any> => {
    return Observable.of({});
  }
};

export const mockRouter: any = {
  navigate: () => {}
};
