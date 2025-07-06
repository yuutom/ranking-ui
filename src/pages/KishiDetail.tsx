import { useNavigate, useParams } from 'react-router-dom'
import type { Player } from '../types/player'
import { DateUtils } from '../utils/DateUtils'
import { ResultStatusIcon } from '../componets/ResultStatusIcon'
import { jsonPlayers } from '../data/playersJson'
import { getFilterdRecord, getRanking, jsonRatingHistory, latestRatings, sortedByStreak, sortedByTotal, sortedByWinRate, sortedByWins, statsMap } from '../data/ratingHistoryJson'
import { extractDisplayGameName } from '../enum/GameCategory'
import { Title } from '../enum/Title'
import { RatingChart } from '../componets/RatingChart'

export function calculateExpectedWinRate(selfRating: number, opponentRating: number): number {
  return 1 / (1 + Math.pow(10, (opponentRating - selfRating) / 400));
}

export default function Example() {
  const navigate = useNavigate();
  const { kishiNumber } = useParams<{ kishiNumber: string }>()
  const player: Player | undefined = jsonPlayers.find(
    (k) => String(k.kishiNumber) === kishiNumber
  )
  if (!player) {
    return <div className="p-8 text-gray-500">棋士が見つかりません</div>
  }

  const playersWithRating = jsonPlayers.map((player) => {
    const rating = latestRatings.get(player.id);
    return {
      ...player,
      rating: rating?.rating ?? 0,
    };
  })

  const displayTitle: string = (() => {
    if (Array.isArray(player?.title) && player.title.length > 0) {
      const hasRyuoh = player.title.includes(Title.RYUOH);
      const hasMeijin = player.title.includes(Title.MEIJIN);
  
      if (hasRyuoh && hasMeijin) {
        return "竜王・名人";
      }
      if (hasRyuoh) {
        return "竜王";
      }
      if (hasMeijin) {
        return "名人";
      }
      return player.title[0];
    }
    return player?.danni ?? "";
  })();

  const sortedRatings = Array.from(latestRatings.entries())
  .sort((a, b) => b[1].rating - a[1].rating)
  .map(([id]) => id); // id順に並んだ配列
  
  const playerRanking = sortedRatings.indexOf(player.id) + 1;
  const playerRating = latestRatings.get(player.id)?.rating;

  const myStats = statsMap.get(player.id);
  const winRateRanking = getRanking(sortedByWinRate, player.id);
  const winsRanking = getRanking(sortedByWins, player.id);
  const totalRanking = getRanking(sortedByTotal, player.id);
  const streakRanking = getRanking(sortedByStreak, player.id);

  const records = getFilterdRecord(player.id);
  const maxRecord = records.reduce((max, current) =>
    current.rating > max.rating ? current : max,
    records[0]
);

const sortedRatingsWithWinRate = playersWithRating
  .sort((a, b) => b.rating - a.rating)
  .map((r, index) => {
    if (playerRating === undefined || r.rating === undefined || playerRating == 0 || r.rating == 0) {
      return {
        rank: index + 1,
        name: r.nameKana,
        id: r.id,
        number: r.kishiNumber,
        rating: r.rating,
        expectedWinRate: "-",
      };
    }

    if (player.id === r.id) {
      return {
        rank: index + 1,
        name: r.nameKana,
        id: r.id,
        number: r.kishiNumber,
        rating: r.rating,
        expectedWinRate: "-",
      };
    }

    const winRate = calculateExpectedWinRate(playerRating, r.rating);

    return {
      rank: index + 1,
      name: r.nameKana,
      id: r.id,
      number: r.kishiNumber,
      rating: r.rating,
      expectedWinRate: winRate,
    };
  });

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <main className="">
          {/* Page header */}
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3 lg:items-stretch">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center space-x-5">
                    <div className="shrink-0">
                      <div className="relative">
                        <img
                          alt=""
                          src={player?.imageUrl}
                          className="size-50 object-cover rounded-full"
                        />
                        <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center space-x-2">
                        <h1 className="text-4xl font-bold text-gray-900">{player?.nameKana}</h1>
                        <h1 className="text-2xl font-bold text-gray-500">({DateUtils.getCurrentAge(player.birthDate)})</h1>
                        <div className="ml-2 space-x-2 rounded-full shrink-0 bg-green-50 px-4.5 py-1.5 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {displayTitle}
                        </div>
                      </div>
                      <div className="mt-1 text-gray-500">{player.nameRome}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6 lg:col-span-1 lg:col-start-3 h-full">
              {/* レーティング */}
              <div className="bg-white shadow sm:rounded-lg flex-1 relative">
                <h2 className="absolute top-3 left-4 text-sm font-bold text-gray-900">レーティング</h2>
                <div className="h-full flex items-center justify-center">
                  <div className="text-3xl text-gray-500">
                    {playerRating?.toFixed(1) ?? "未評価"}
                  </div>
                </div>
              </div>

              {/* 順位 */}
              <div className="bg-white shadow sm:rounded-lg flex-1 relative">
                <h2 className="absolute top-3 left-4 text-sm font-bold text-gray-900">順位</h2>
                <div className="h-full flex items-center justify-center">
                  <div className="text-3xl text-gray-500">
                    {playerRating ? `${playerRanking} 位` : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
            <div className="flex flex-col space-y-6 lg:col-span-1 lg:col-start-1 h-full">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg/6 font-medium text-gray-900">
                      棋士情報
                    </h2>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">棋士番号</dt>
                        <dd className="mt-1 text-sm text-gray-900">{player?.kishiNumber}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">出身地</dt>
                        <dd className="mt-1 text-sm text-gray-900">{player?.birthPlace}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">段位</dt>
                        <dd className="mt-1 text-sm text-gray-900">{player.danni}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">師匠</dt>
                        <dd className="mt-1 text-sm text-gray-900">{player?.master}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">生年月日</dt>
                        <dd className="mt-1 text-sm text-gray-900">{DateUtils.formatJapaneseDate(player.birthDate)}（{DateUtils.getCurrentAge(player.birthDate)}歳）</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">デビュー年月日</dt>
                        <dd className="mt-1 text-sm text-gray-900">{DateUtils.formatJapaneseDate(player.debutDate)}（{DateUtils.getDebutAge(player.birthDate, player.debutDate)}歳）</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">所属</dt>
                        <dd className="mt-1 text-sm text-gray-900">{player.affiliation}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">棋風</dt>
                        <dd className="mt-1 text-sm text-gray-900">{player.playingStyle}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">順位戦</dt>
                        <dd className="mt-1 text-sm text-gray-900">{player?.junisen}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">竜王戦</dt>
                        <dd className="mt-1 text-sm text-gray-900 mb-4">{player?.ryuohsen}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* 棋士成績*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        棋士成績
                      </h2>
                    </div>
                    <div className="mt-2 mb-4 flow-root overflow-hidden">
                      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <table className="w-full text-left">
                          <tbody>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  今年度成績
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                  {myStats ? `${(myStats.wins)}勝${myStats.total - myStats.wins}敗` : "-"}
                                </td>
                              </tr>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  勝率ランキング
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                  {myStats ? `${(myStats.winRate * 100).toFixed(0)}% (${winRateRanking}位)` : "-"}
                                </td>
                              </tr>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  対局数ランキング
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                  {myStats ? `${myStats.total}局 (${totalRanking}位)` : "-"}
                                </td>
                              </tr>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  勝数ランキング
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                  {myStats ? `${myStats.wins}勝 (${winsRanking}位)` : "-"}
                                </td>
                              </tr>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  連勝ランキング
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                  {myStats ? `${myStats.maxStreak}連勝 (${streakRanking}位)` : "-"}
                                </td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 対局結果タイムライン */}
            <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-2 h-full flex flex-col">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 flex-1 flex flex-col">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  直近10局の対局結果
                </h2>
                {/* Activity Feed */}
                <div className="mt-6 flow-root flex-1 overflow-y-auto">
                  <ul role="list" className="space-y-8">
                    {records
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 10)
                      .map((result) => (
                        <li key={result.game_id} className="flex items-center gap-3 text-sm text-gray-700 pb-2">
                          {/* 結果アイコン */}
                          <div className="flex items-center justify-center w-6 h-6">{ResultStatusIcon(result.result_status)}</div>

                          {/* 対局名 + 相手 */}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900">
                              {extractDisplayGameName(result.game_name)}
                            </div>
                            <div className="text-xs text-gray-500 flex flex-wrap gap-1">
                              <span>vs.</span>
                              <a href={`/players/${result.opponent_number}`} className="underline">
                                {result.opponent_name}
                              </a>
                              <span>({result.opponent_rating.toFixed(0)})</span>
                            </div>
                          </div>

                          {/* 自分のレーティング + Δ */}
                          <div className="w-20 text-right">
                            <div className="font-semibold text-gray-800">{result.rating.toFixed(0)}</div>
                            <div className="text-xs text-gray-500">({result.delta.toFixed(1)})</div>
                          </div>

                          {/* 日付 */}
                          <div className="w-24 text-right text-xs text-gray-500">
                            {DateUtils.formatShortDate(result.date)}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* レーティングチャート */}
            <section className="lg:col-span-2 lg:col-start-1 h-full flex flex-col">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 flex-1 flex flex-col">
                <div className="justify-between items-start">
                  <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                    レーティング推移
                  </h2>
                  {maxRecord && (
                    <div className="text-sm text-right text-gray-600">
                      <div className="text-md">最高レート</div>
                      <div className="text-md font-bold text-gray-800">{maxRecord.rating.toFixed(0)}</div>
                      <div className="text-xs text-gray-500">{DateUtils.formatJapaneseDate(maxRecord.date)}</div>
                    </div>
                  )}
                </div>
                <div className="mt-8">
                <RatingChart ratingHistory={jsonRatingHistory} playerId={player.id} />
                </div>
              </div>
            </section>

              {/* 勝率テーブル */}
              <section className="lg:col-span-2 lg:col-start-1 h-full flex flex-col">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 flex-1 flex flex-col">
                  <div className="justify-between items-start">
                    <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                      勝率期待値
                    </h2>
                    <table className="mt-8 min-w-full divide-y divide-gray-300">
                      <thead>
                      <tr>
                          <th className="px-3 py-3.5 text-left">順位</th>
                          <th className="px-3 py-3.5 text-center">名前</th>
                          <th className="px-3 py-3.5 text-center">レート</th>
                          <th className="px-3 py-3.5 text-center">勝率</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {sortedRatingsWithWinRate.map((row) => (
                          <tr                     
                            key={row.number}
                            onClick={() => navigate(`/players/${row.number}`)}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <td className="px-3 py-3.5 text-left text-gray-500 text-sm">{row.rank}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{row.name}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{row.rating.toFixed(0)}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">
                              {typeof row.expectedWinRate === "number"
                                ? `${(row.expectedWinRate * 100).toFixed(1)}%`
                                : row.expectedWinRate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

          </div>
        </main>
      </div>
    </>
  )
}
