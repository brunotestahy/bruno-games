import {Component, OnInit} from '@angular/core';
import {GameService} from '../shared/services/game.service';
import {GameCategory} from '../shared/models/game-category';
import {CacheService} from '../shared/services/cache.service';
import {GameCategoriesApi} from '../shared/models/API/game-categories-api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  gameCategories: GameCategory[] = this._cacheService.getCachedValue('game-categories');

  constructor(private _gameService: GameService,
              private _cacheService: CacheService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this._gameService.getCategories()
      .subscribe((response: GameCategoriesApi) => {
          console.log(response);
          this.gameCategories = response._embedded.game_categories;
          this._cacheService.setCachedValue('game-categories', response);
        },
        error => console.error(error));
  }
}
