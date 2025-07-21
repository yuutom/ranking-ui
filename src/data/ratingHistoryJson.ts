import { PlayerCategory } from '../enum/PlayerCategory';
import { ResultStatus } from '../enum/ResultStatus';
import type { RatingRecord } from '../types/RatingRecord';
import { getJsonJoryu, getJsonKishi } from './playersJson';

const RATING_HISTORY_URL = "https://kishi-info.s3.ap-northeast-1.amazonaws.com/rating_history.json";

let jsonRatingHistory: RatingRecord[] | null = null;

export async function fetchRatingHistory(): Promise<RatingRecord[]> {
  if (jsonRatingHistory) {
    return jsonRatingHistory;
  }
  const response = await fetch(RATING_HISTORY_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch rating history: ${response.statusText}`);
  }
  const rawRatingHistory = await response.json();
  jsonRatingHistory = rawRatingHistory.map(convertEnums);
  return jsonRatingHistory;
}

export function convertEnums(raw: any): RatingRecord {
  const playerCategoryList = Object.values(PlayerCategory);
  const resultStatusList = Object.values(ResultStatus);
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
  };
}

// player_idでフィルターした日付（昇順）でソートされた対局リスト
export async function getFilterdRecord(playerId: string): Promise<RatingRecord[]> {
  const history = await fetchRatingHistory();
  return history
    .filter((r) => r.player_id === playerId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// player_id: 最新の対局時のRatingRecord
export async function getLatestKishiRatings(): Promise<Map<string, RatingRecord>> {
  const history = await fetchRatingHistory();
  const jsonKishi = await getJsonKishi();
  const map = new Map<string, RatingRecord>();
  const kishiRatingHistory = history.filter(
    (record) =>
      record.player_category === PlayerCategory.KISHI &&
      jsonKishi.map((p) => p.id).includes(record.player_id)
  );

  for (const r of kishiRatingHistory) {
    const existing = map.get(r.player_id);
    if (!existing || new Date(r.date) > new Date(existing.date)) {
      map.set(r.player_id, r);
    }
  }
  return map;
}

export async function getLatestJoryuRatings(): Promise<Map<string, RatingRecord>> {
  const history = await fetchRatingHistory();
  const jsonJoryu = await getJsonJoryu();
  const map = new Map<string, RatingRecord>();
  const joryuRatingHistory = history.filter(
    (record) =>
      record.player_category === PlayerCategory.JORYU &&
      jsonJoryu.map((p) => p.id).includes(record.player_id)
  );
  for (const r of joryuRatingHistory) {
    const existing = map.get(r.player_id);
    if (!existing || new Date(r.date) > new Date(existing.date)) {
      map.set(r.player_id, r);
    }
  }
  return map;
}

// 今年の対局結果
export async function getLatestGameResults(): Promise<RatingRecord[]> {
  const history = await fetchRatingHistory();
  const currentYear = new Date().getFullYear();
  return history.filter((record) => record.year === currentYear);
}

// player_id: {勝局数, 対局数, 勝率, 連勝数}のMap
export async function getStatsMap(): Promise<Map<string, { wins: number; total: number; winRate: number; maxStreak: number }>> {
  const latestGameResults = await getLatestGameResults();
  const statsMap = new Map<
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

  return statsMap;
}

// 3. 各種ソートでランキングを決定
export async function getSortedByWinRate(): Promise<[string, { wins: number; total: number; winRate: number; maxStreak: number }][] > {
  const statsMap = await getStatsMap();
  const entries = Array.from(statsMap.entries());
  return [...entries].sort((a, b) => b[1].winRate - a[1].winRate);
}

export async function getSortedByWins(): Promise<[string, { wins: number; total: number; winRate: number; maxStreak: number }][] > {
  const statsMap = await getStatsMap();
  const entries = Array.from(statsMap.entries());
  return [...entries].sort((a, b) => b[1].wins - a[1].wins);
}

export async function getSortedByTotal(): Promise<[string, { wins: number; total: number; winRate: number; maxStreak: number }][] > {
  const statsMap = await getStatsMap();
  const entries = Array.from(statsMap.entries());
  return [...entries].sort((a, b) => b[1].total - a[1].total);
}

export async function getSortedByStreak(): Promise<[string, { wins: number; total: number; winRate: number; maxStreak: number }][] > {
  const statsMap = await getStatsMap();
  const entries = Array.from(statsMap.entries());
  return [...entries].sort((a, b) => b[1].maxStreak - a[1].maxStreak);
}

// 4. プレイヤーのランキング情報を取得
export async function getRanking(list: [string, { wins: number; total: number; winRate: number; maxStreak: number }][], playerId: string): Promise<number> {
  return list.findIndex(([id]) => id === playerId) + 1;
}
