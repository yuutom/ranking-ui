import { PlayerCategory } from '../enum/PlayerCategory'
import { ResultStatus } from '../enum/ResultStatus';
import type { RatingRecord } from '../types/RatingRecord'
import rawRatingHistory from './rating_history.json'


const jsonRatingHistory: RatingRecord[] = rawRatingHistory.map(convertEnums);

export function convertEnums(raw: any): RatingRecord {
  const playerCategoryList = Object.values(PlayerCategory)
  const resultStatusList = Object.values(ResultStatus)
    return {
      player_number: raw.player_number,
      player_category: playerCategoryList[raw.player_category],
      player_id: raw.player_id,
      player_name: raw.player_name,
      opponent_number: raw.opponent_number,
      opponent_category: playerCategoryList[raw.opponent_category],
      opponent_id: raw.opponent_id,
      opponent_name: raw.opponent_name,
      year: raw.year,
      date: raw.date,
      rating: raw.rating,
      delta: raw.delta,
      opponent_rating: raw.opponent_rating,
      opponent_rating_delta: raw.opponent_rating_delta,
      game_id: raw.game_id,
      game_name: raw.game_name,
      result_status: resultStatusList[raw.result_status],
    }
  }

export const latestRatings = (() => {
  const map = new Map<string, RatingRecord>();

  for (const r of jsonRatingHistory as RatingRecord[]) {
    const existing = map.get(r.player_id);
    if (!existing || new Date(r.date) > new Date(existing.date)) {
      map.set(r.player_id, r);
    }
  }
  return map;
})();

export const latestGameResults = (() => {
  const currentYear = new Date().getFullYear();
  return jsonRatingHistory.filter((record) => record.year === currentYear);
})();