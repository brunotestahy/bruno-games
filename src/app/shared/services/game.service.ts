import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {GameCategoriesApi} from '../models/API/game-categories-api';

@Injectable()
export class GameService {

  private readonly baseURL = 'https://staging-frontapi.cherrytech.com/';
  private readonly credentials = '?brand=cherrycasino.desktop&locale=en';

  constructor(private _http: HttpClient) {
  }

  getGames(): Observable<any> {
    const append = 'games';
    return this._http.get<any>(this.baseURL + append);
  }

  getCategories(category = ''): Observable<GameCategoriesApi> {
    const append = 'game-categories';
    category = category ? '/' + category : category;
    return this._http.get<GameCategoriesApi>(this.baseURL + append + category + this.credentials);
  }
}
