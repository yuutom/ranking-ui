import type { PlayerCategory } from '../enum/PlayerCategory';

export interface RatingRecord {
    player_number: number;
    player_category: PlayerCategory;
    player_id: string;
    date: string;
    rating: number;
    delta: number;
    game_id: number;
  };
