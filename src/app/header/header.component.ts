import {Component, OnInit} from '@angular/core';
import {GameService} from '../shared/services/game.service';
import {GameCategory} from '../shared/models/game-category';
import {CacheService} from '../shared/services/cache.service';
import {GameCategoriesApi} from '../shared/models/game-categories';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  gameCategories: GameCategory[] = this._cacheService.getCachedValue('game-categories') ?
    this._cacheService.getCachedValue('game-categories') : null;

  constructor(private _gameService: GameService,
              private _cacheService: CacheService,
              private _router: Router) {
  }

  ngOnInit() {
    if (!this.gameCategories) {
      this._router.navigate(['games', 'popular-games']);
      this.loadCategories();
    }
  }

  loadCategories() {
    this._gameService.getAllCategories()
      .subscribe((response: GameCategoriesApi) => {
          console.log(response);
          this.gameCategories = response._embedded.game_categories;
          this._cacheService.setCachedValue('game-categories', this.gameCategories);
        },
        error => console.error(error));
  }

  goToGameCategory(category: string) {
    this._router.navigate(['games', category])
      .then(() => {
        this._gameService.emitGameCategoryChange();
      });
  }
}
