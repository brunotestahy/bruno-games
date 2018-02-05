import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {GameCategoriesApi} from '../models/game-categories';
import {GameCategory} from '../models/game-category';
import {Subject} from 'rxjs/Subject';
import {Game} from '../models/game';

@Injectable()
export class GameService {

  private onGameCategoryChange: Subject<any> = new Subject();
  handleGameCategoryChange$ = this.onGameCategoryChange.asObservable();

  private onSearchBarValueChange: Subject<string> = new Subject();
  handleSearchBarValueChange$ = this.onSearchBarValueChange.asObservable();

  private readonly baseURL = 'https://staging-frontapi.cherrytech.com/';
  private readonly credentials = '?brand=cherrycasino.desktop&locale=en';

  constructor(private _http: HttpClient) {
  }

  emitGameCategoryChange() {
    this.onGameCategoryChange.next();
  }

  emitSearchBarValueChange(value: string) {
    this.onSearchBarValueChange.next(value);
  }

  getGameById(id: string): Observable<Game> {
    const append = 'games';
    id = id ? '/' + id : id;
    return this._http.get<Game>(this.baseURL + append + id + this.credentials);
  }

  getAllCategories(): Observable<GameCategoriesApi> {
    const append = 'game-categories';
    return this._http.get<GameCategoriesApi>(this.baseURL + append + this.credentials);
  }

  getGamesByCategory(category = 'popular-games'): Observable<GameCategory> {
    const append = 'game-categories';
    category = category ? '/' + category : category;
    return this._http.get<GameCategory>(this.baseURL + append + category + this.credentials);
  }
}
