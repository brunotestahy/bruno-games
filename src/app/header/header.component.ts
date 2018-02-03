import {Component, OnInit} from '@angular/core';
import {GameService} from '../games/game.service';
import {GameCategory} from '../shared/models/game-category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  gameCategories: GameCategory[];

  constructor(private _gameService: GameService) {
  }

  ngOnInit() {
    this.gameCategories = this._gameService.getCachedCategories();
  }

}
