import { useParams } from 'react-router-dom'
import type { Player } from '../types/player'
import { DateUtils } from '../utils/DateUtils'
import { ResultStatusIcon } from '../componets/ResultStatusIcon'
import { jsonPlayers } from '../data/playersJson'

export default function Example() {
  const { kishiNumber } = useParams<{ kishiNumber: string }>()
  const player: Player | undefined = jsonPlayers.find(
    (k) => String(k.kishiNumber) === kishiNumber
  )
  if (!player) {
    return <div className="p-8 text-gray-500">棋士が見つかりません</div>
  }
  const displayTitle: string[] =
  Array.isArray(player?.title) && player.title.length > 0
    ? player.title
    : [player?.danni ?? ''];

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
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="shrink-0">
                <div className="relative">
                  <img
                    alt=""
                    src={player?.imageUrl}
                    className="size-40 object-cover rounded-full"
                  />
                  <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-gray-900">{player?.nameKana}</h1>
                  <h1 className="text-2xl font-bold text-gray-500">({DateUtils.getCurrentAge(player.birthDate)})</h1>
                  <div className="ml-2 space-x-2">
                  {displayTitle.map((title) => (
                  <span className="inline-flex shrink-0 rounded-full bg-green-50 px-4.5 py-1.5 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {title}
                  </span>
                  ))}
                  </div>
                </div>
                <div className="mt-1 text-gray-500">{player.nameRome}</div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
            <div className="space-y-6 lg:col-span-1 lg:col-start-1">
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
                        <dd className="mt-1 text-sm text-gray-900">{player?.ryuohsen}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">紹介</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          -
                        </dd>
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
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{player.record?.wins}勝{player.record?.loses}敗</td>
                              </tr>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  勝率ランキング
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {player.record && (player.record.wins + player.record.loses > 0) ? (
                                  <>
                                  {((player.record.wins / (player.record.wins + player.record.loses))).toFixed(4)} ({player.record?.winning_rate_ranking}位)
                                  </>
                                ) : (
                                  "-"
                                )}
                              </td>
                              </tr>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  対局数ランキング
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {player.record && (player.record.wins + player.record.loses > 0) ? (
                                  <>
                                  {(player.record.wins + player.record.loses)}局 ({player.record?.total_ranking}位)
                                  </>
                                ) : (
                                  "-"
                                )}
                              </td>
                              </tr>
                              <tr>
                                <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                  勝数ランキング
                                  <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                  <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {player.record && (player.record.wins > 0) ? (
                                  <>
                                  {player.record.wins}勝 ({player.record?.wins_ranking}位)
                                  </>
                                ) : (
                                  "-"
                                )}
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
            <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-2">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  対局結果
                </h2>
                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                <ul role="list" className="-mb-8">
                {player.resultsFromKishi?.map((result) => (
                  <li key={result.gameName}>
                    <div className="relative pb-8">
                      <div className="relative flex items-center space-x-3">
                        <div>{ResultStatusIcon(result.resultStatus)}</div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{result.gameName}</p>
                            <p className="ml-4 text-xs text-gray-500">vs. {result.oponentName}</p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {DateUtils.formatShortDate(result.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                </ul>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
