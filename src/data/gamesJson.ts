import { GameCategory } from "../enum/GameCategory";
import { PlayerCategory } from "../enum/PlayerCategory";
import { ResultStatus } from "../enum/ResultStatus";
import type { Game } from "../types/game";
import rawGameResults from './game_results.json'
import { latestGameResults } from "./ratingHistoryJson";

export const jsonGameResults: Game[] = rawGameResults.flat().map(convertEnums);

export function convertEnums(raw: any): Game {
  const playerCategoryList = Object.values(PlayerCategory)
  const resultStatusList = Object.values(ResultStatus)
  const gameCategoryList = Object.values(GameCategory)

    return {
      game_id: raw.game_id,
      game_name: raw.game_name,
      game_category: gameCategoryList[raw.game_category],
      sente_player_number: raw.sente_player_number,
      sente_player_name: raw.sente_player_name,
      sente_player_category: playerCategoryList[raw.sente_player_category],
      sente_player_id: raw.sente_player_id,
      sente_player_result: resultStatusList[raw.sente_player_result],
      gote_player_number: raw.gote_player_number,
      gote_player_name: raw.gote_player_name,
      gote_player_category: playerCategoryList[raw.gote_player_category],
      gote_player_id: raw.gote_player_id,
      gote_player_result: resultStatusList[raw.gote_player_result],
      date: raw.date,
      year: raw.year,
    }
  }

export function getPickedUpRecentGames(): any[]{
const today = new Date();
const oneWeekAgo = new Date(today);
oneWeekAgo.setDate(today.getDate() - 7);
// 今週の対局結果
const weeklyResults = jsonGameResults.filter((results) => {
    const recordDate = results.date?.[0] ? new Date(results.date[0]) : null;
    return recordDate && recordDate >= oneWeekAgo && recordDate <= today;
});
const weeklyResultsWithRating = weeklyResults.map((game) => {
  const senteRating = latestGameResults
  .find((r) => r.player_id === game.sente_player_id && r.game_id === game.game_id);
    const goteRating = latestGameResults
        .find((r) => r.player_id === game.gote_player_id && r.game_id === game.game_id);
    return {
      ...game,
      sente_rating: senteRating?.rating ?? 0,
      sente_rating_delta: senteRating?.delta ?? 0,
      gote_rating: goteRating?.rating ?? 0,
      gote_rating_delta: goteRating?.delta ?? 0,
    };
});

return weeklyResultsWithRating
  .sort((a, b) => (b.sente_rating + b.gote_rating) - (a.sente_rating + a.gote_rating))
  .slice(0, 8)
  .sort((a, b) => {
    const aDate = new Date(a.date[0]);
    const bDate = new Date(b.date[0]);
    return bDate.getTime() - aDate.getTime();
  });
}
