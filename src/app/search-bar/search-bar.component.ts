import { Component, OnInit } from '@angular/core';
import {GameService} from '../shared/services/game.service';
import {CacheService} from '../shared/services/cache.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchValue: string = this._cacheService.getCachedValue('filtered-value') || '';

  constructor(private _gameService: GameService,
              private _cacheService: CacheService) { }

  ngOnInit() {
  }

  // Emit a new event whenever a different value is typed
  onSearchValueChange(value: string) {
    this._gameService.emitSearchBarValueChange(value);
  }
}
