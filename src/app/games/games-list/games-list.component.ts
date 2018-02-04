import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CacheService} from '../../shared/services/cache.service';
import {GameCategory} from '../../shared/models/game-category';
import {GameService} from '../../shared/services/game.service';
import {Game} from '../../shared/models/game';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  gameCategory: GameCategory = this._cacheService.getCachedValue('game-category') ?
    this._cacheService.getCachedValue('game-category') : null;

  constructor(private _activatedRoute: ActivatedRoute,
              private _cacheService: CacheService,
              private _gameService: GameService) {
  }

  ngOnInit() {
    if (!this.gameCategory) {
      this.getCategoryFromRoute();
    }
  }

  getCategoryFromRoute() {
    this._activatedRoute.params
      .subscribe((params) => {
        const category = params['category'];

        this._gameService.getGamesByCategory(category)
          .subscribe((response: GameCategory) => {
              this.gameCategory = response;
              console.log(this.gameCategory);
              this._cacheService.setCachedValue('game-category', this.gameCategory);
            },
            error => console.error(error));
      });
  }
}
