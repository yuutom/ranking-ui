import { PlayerCategory } from '../enum/PlayerCategory'
import { ResultStatus } from '../enum/ResultStatus';
import type { RatingRecord } from '../types/RatingRecord'
import rawRatingHistory from './rating_history.json'

// プレイヤーごとの全ての対局結果のリスト
export const jsonRatingHistory: RatingRecord[] = rawRatingHistory.map(convertEnums);

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

// player_idでフィルターした日付（昇順）でソートされた対局リスト
export function getFilterdRecord(playerId: string): RatingRecord[] {
  return jsonRatingHistory
  .filter((r) => r.player_id === playerId)
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

// player_id: 最新の対局時のRatingRecord
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

// 今年の対局結果
export const latestGameResults = (() => {
  const currentYear = new Date().getFullYear();
  return jsonRatingHistory.filter((record) => record.year === currentYear);
})();

// player_id: {勝局数, 対局数, 勝率, 連勝数}のMap
export const statsMap = new Map<
  string,
  {
    wins: number;
    total: number;
    winRate: number;
    maxStreak: number;
  }
>();

for (const result of latestGameResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())) {
  const playerId = result.player_id;
  if (!statsMap.has(playerId)) {
    statsMap.set(playerId, { wins: 0, total: 0, winRate: 0, maxStreak: 0 });
  }

  const stats = statsMap.get(playerId)!;
  stats.total += 1;

  const isWin =
    result.result_status === ResultStatus.WIN ||
    result.result_status === ResultStatus.BYE_WIN;

  if (isWin) {
    stats.wins += 1;
  }
}

// 2. 勝率、連勝記録を計算
for (const [playerId, stats] of statsMap.entries()) {
  stats.winRate = stats.total > 0 ? stats.wins / stats.total : 0;

  const games = latestGameResults
    .filter((r) => r.player_id === playerId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let currentStreak = 0;
  let maxStreak = 0;

  for (const g of games) {
    const isWin =
      g.result_status === ResultStatus.WIN ||
      g.result_status === ResultStatus.BYE_WIN;
    if (isWin) {
      currentStreak += 1;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  stats.maxStreak = maxStreak;
}

// 3. 各種ソートでランキングを決定
const entries = Array.from(statsMap.entries());

export const sortedByWinRate = [...entries].sort((a, b) => b[1].winRate - a[1].winRate);
export const sortedByWins = [...entries].sort((a, b) => b[1].wins - a[1].wins);
export const sortedByTotal = [...entries].sort((a, b) => b[1].total - a[1].total);
export const sortedByStreak = [...entries].sort((a, b) => b[1].maxStreak - a[1].maxStreak);

// 4. プレイヤーのランキング情報を取得
export const getRanking = (list: typeof entries, playerId: string) =>
  list.findIndex(([id]) => id === playerId) + 1;
