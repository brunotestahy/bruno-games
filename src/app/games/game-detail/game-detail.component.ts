import {Component, HostBinding, OnInit} from '@angular/core';
import {GameService} from '../../shared/services/game.service';
import {CacheService} from '../../shared/services/cache.service';
import {ActivatedRoute} from '@angular/router';
import {fadeAnimationTrigger} from '../../shared/animations/fade-animation';
import {Game} from '../../shared/models/game';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
  animations: [
    fadeAnimationTrigger({duration: '200ms'}) // Params => {duration: '100ms'}
  ]
})
export class GameDetailComponent implements OnInit {
  // Enable Animation Trigger
  @HostBinding('@fadeAnimation') fadeAnimationActive = true;

  isLoading = true;
  selectedGame: Game;

  constructor(private _activatedRoute: ActivatedRoute,
              private _cacheService: CacheService,
              private _gameService: GameService) {
  }

  ngOnInit() {
    this.getCategoryFromRoute();
  }

  getCategoryFromRoute() {
    this.isLoading = true;
    this._activatedRoute.params
      .take(1)
      .subscribe((params) => {
        const id = params['id'];
        this.selectedGame = this._cacheService.getCachedValue('selected-game');
        if (!this.selectedGame || this.selectedGame.id !== id) {
          this._gameService.getGameById(id)
            .subscribe((response: Game) => {
                this.selectedGame = response;
                console.log(this.selectedGame);
                this._cacheService.setCachedValue('selected-game', this.selectedGame);
                this.isLoading = false;
              },
              (error) => {
                console.error(error);
                this.isLoading = false;
              });
        } else {
          this.isLoading = false;
        }
      });
  }

  backToPreviousPage() {
    window.history.back();
  }
}
