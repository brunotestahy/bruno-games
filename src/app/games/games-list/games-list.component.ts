import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CacheService} from '../../shared/services/cache.service';
import {GameCategory} from '../../shared/models/game-category';
import {GameService} from '../../shared/services/game.service';
import {fadeAnimationTrigger} from '../../shared/animations/fade-animation';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

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
  onSearchValueChangeSubscription: Subscription;

  isLoading = true;
  maxLoadedGames = this._cacheService.getCachedValue('load-more-state') || 12;

  searchBarValueHandler = this._cacheService.getCachedValue('filtered-value') || '';

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

    this.saveLoadMoreState();
  }

  loadGeneralListeners() {
    this.onGameCategoryChangeSubscription = this._gameService.handleGameCategoryChange$
      .subscribe(() => {
        console.log('emit');
        this.maxLoadedGames = 12;
        this.getCategoryFromRoute();
      });

    this.onSearchValueChangeSubscription = this._gameService.handleSearchBarValueChange$.debounceTime(500)
      .subscribe((value: string) => {
        this.searchBarValueHandler = value;
        this._cacheService.setCachedValue('filtered-value', this.searchBarValueHandler);
      });
  }

  unloadGeneralListeners() {
    this.onGameCategoryChangeSubscription.unsubscribe();
    this.onSearchValueChangeSubscription.unsubscribe();
  }

  getCategoryFromRoute() {
    this.isLoading = true;
    this.maxLoadedGames = 12;
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

  saveLoadMoreState() {
    this._cacheService.setCachedValue('load-more-state', this.maxLoadedGames);
  }
}
