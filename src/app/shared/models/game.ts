export interface Game {
  background?: string;
  backgrounds?: string[];
  cols?: number;
  createdAt?: {
    date?: string;
    timezone?: string;
    timezone_type?: number;
  };
  description?: string;
  enabled?: boolean;
  game_stakes?: any;
  height?: string;
  homepage_image?: any;
  id?: string;
  jurisdiction?: string;
  label?: string;
  login_required?: boolean;
  meta?: {
    bonus?: boolean;
    currency?: string;
    description_long?: string;
    description_short?: string;
    free_spins?: boolean;
    lines?: number;
    max_bet?: number;
  };
  name?: string;
  pos_x?: any;
  pos_y?: any;
  rating?: number;
  rows?: number;
  screenshot?: any;
  screenshots?: any[];
  slug?: string;
  thumbnail?: string;
  thumbnails?: {
    '280x280'?: string;
    '280x600'?: string
    '600x280'?: string;
    legacy?: string;
  };
  url?: any;
  vendor?: string;
  vendor_properties?: {
    csid?: number;
    sext1?: string;
    sext2?: string;
    gameid?: string;
    authtoken?: string;
    bc?: string;
    launch_url?: string;
  };
  volatility?: number;
  width?: string;
}
