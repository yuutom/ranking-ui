import { PlayerCategory } from '../enum/PlayerCategory'
import type { RatingRecord } from '../types/RatingRecord'
import rawRatingHistory from './rating_history.json'


const jsonRatingHistory: RatingRecord[] = rawRatingHistory.map(convertEnums);

export function convertEnums(raw: any): RatingRecord {
  const playerCategoryList = Object.values(PlayerCategory)
    return {
      player_number: raw.player_number,
      player_category: playerCategoryList[raw.player_category],
      player_id: raw.player_id,
      date: raw.date?.[0] ?? "",
      rating: raw.rating,
      delta: raw.delta,
      game_id: raw.game_id,
    }
  }

export const latestRatings = (() => {
  const map = new Map<string, RatingRecord>();

  for (const r of jsonRatingHistory as RatingRecord[]) {
    const existing = map.get(r.player_id);
    if (!existing || new Date(r.date) <= new Date(existing.date)) {
      map.set(r.player_id, r);
    }
  }
  return map;
})();