import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CacheService} from '../../shared/services/cache.service';
import {GameCategory} from '../../shared/models/game-category';
import {GameService} from '../../shared/services/game.service';
import {fadeAnimationTrigger} from '../../shared/animations/fade-animation';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  animations: [
    fadeAnimationTrigger({duration: '200ms'}) // Params => {duration: '100ms'}
  ]
})
export class GamesListComponent implements OnInit, OnDestroy {
// Enable Animation Trigger
  @HostBinding('@fadeAnimation') fadeAnimationActive = true;

  gameCategory: GameCategory = this._cacheService.getCachedValue('game-category') ?
    this._cacheService.getCachedValue('game-category') : null;

  onGameCategoryChangeSubscription: Subscription;

  isLoading = true;
  maxLoadedGames = 12;

  constructor(private _activatedRoute: ActivatedRoute,
              private _cacheService: CacheService,
              private _gameService: GameService) {
  }

  ngOnInit() {
    this.loadGeneralListeners();
    if (!this.gameCategory) {
      this.getCategoryFromRoute();
    } else {
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.unloadGeneralListeners();
  }

  loadGeneralListeners() {
    this.onGameCategoryChangeSubscription = this._gameService.handleGameCategoryChange$
      .subscribe(() => {
        console.log('emit');
        this.getCategoryFromRoute();
      });
  }

  unloadGeneralListeners() {
    this.onGameCategoryChangeSubscription.unsubscribe();
  }

  getCategoryFromRoute() {
    this.isLoading = true;
    this._activatedRoute.params
      .take(1)
      .subscribe((params) => {
        const category = params['category'];
        this._gameService.getGamesByCategory(category)
          .subscribe((response: GameCategory) => {
              this.gameCategory = response;
              console.log(this.gameCategory);
              this._cacheService.setCachedValue('game-category', this.gameCategory);
              this.isLoading = false;
            },
            (error) => {
              console.error(error);
              this.isLoading = false;
            });
      });
  }

  loadMoreGames() {
    if (this.maxLoadedGames < this.gameCategory._embedded.games.length) {
      this.maxLoadedGames = this.maxLoadedGames + 12;
    }
  }
}
