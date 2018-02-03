import {Game} from './game';

export interface GameCategory {
  _embedded: {
    games: Game[];
  };
  _links: {
    self: {
      href: string
    };
  };
  name: string;
  order: number;
  slug: string;
}
