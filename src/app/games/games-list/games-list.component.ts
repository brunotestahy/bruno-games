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

  // Loading state control
  isLoading = true;
  // Max loaded games control
  maxLoadedGames = this._cacheService.getCachedValue('load-more-state') || 12;

  // Filtered value on search bar
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

  // General listeners to operate async events
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

  // Destroy the listeners
  unloadGeneralListeners() {
    this.onGameCategoryChangeSubscription.unsubscribe();
    this.onSearchValueChangeSubscription.unsubscribe();
  }

  getCategoryFromRoute() {
    // Reset the initial state for the controls
    this.isLoading = true;
    this.maxLoadedGames = 12;

    // Get param on url
    this._activatedRoute.params
      // Avoid duplicated events
      .take(1)
      .subscribe((params) => {
        const category = params['category'];
        this._gameService.getGamesByCategory(category)
          .subscribe((response: GameCategory) => {
              this.gameCategory = response;
              // Saving the response on the cache service
              this._cacheService.setCachedValue('game-category', this.gameCategory);
              this.isLoading = false;
            },
            (error) => {
              console.error(error);
              this.isLoading = false;
            });
      });
  }

  // Increment 12 by 12 new games on list to avoid slow loading
  loadMoreGames() {
    if (this.maxLoadedGames < this.gameCategory._embedded.games.length) {
      this.maxLoadedGames = this.maxLoadedGames + 12;
    }
  }

  saveLoadMoreState() {
    this._cacheService.setCachedValue('load-more-state', this.maxLoadedGames);
  }
}
