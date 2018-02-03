import {GameCategory} from '../game-category';

export interface GameCategoriesApi {
  _embedded: {
    game_categories: GameCategory[];
  };
  _links: {
    self: {
      href: string
    };
  };
  total_items: number;
}
