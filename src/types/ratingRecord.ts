import type { PlayerCategory } from '../enum/PlayerCategory';
import type { ResultStatus } from '../enum/ResultStatus';

export interface RatingRecord {
    player_number: number;
    player_category: PlayerCategory;
    player_id: string;
    player_name: string;
    opponent_number: number;
    opponent_category: PlayerCategory;
    opponent_id: string;
    opponent_name: string;
    year: number;
    date: string;
    rating: number;
    delta: number;
    opponent_rating: number;
    opponent_rating_delta: number;
    game_id: number;
    game_name: string;
    result_status: ResultStatus;
  };
