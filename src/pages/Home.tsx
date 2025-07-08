import { jsonJoryu, jsonKishi } from "../data/playersJson";
import { latestJoryuRatings, latestKishiRatings } from "../data/ratingHistoryJson";
import { useNavigate } from "react-router-dom";
import { DateUtils } from "../utils/DateUtils";
import { getPickedUpRecentGames } from "../data/gamesJson";
import { ResultStatusIcon } from "../componets/ResultStatusIcon";
import { extractDisplayGameName } from "../enum/GameCategory";

export default function Home() {

    const kishiWithRating = jsonKishi
      .map((player) => {
        const rating = latestKishiRatings.get(player.id);
        return {
          ...player,
          rating: rating?.rating ?? 0,
        };
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));
    const joryuWithRating = jsonJoryu
      .map((player) => {
        const rating = latestJoryuRatings.get(player.id);
        return {
          ...player,
          rating: rating?.rating ?? 0,
        };
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));
    const navigate = useNavigate();

    return (
        <div className="mx-auto mt-4 grid max-w-3xl grid-cols-2 gap-15 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2">
            <section className="lg:col-span-1 lg:col-start-1 h-full flex flex-col">
                <div className="bg-white px-4 py-2 shadow sm:rounded-4xl sm:px-6 flex-1 flex flex-col">
                  <div className="justify-between items-start">
                    <h2 id="timeline-title" className="mt-4 text-base font-semibold text-gray-900">
                      棋士
                    </h2>
                    <table className="mt-4 min-w-full divide-y divide-gray-300">
                      <thead>
                      <tr>
                          <th className="px-3 py-3.5 text-left">順位</th>
                          <th className="px-3 py-3.5 text-left">名前</th>
                          <th className="px-3 py-3.5 text-center">レート</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {kishiWithRating.map((row) => (
                          <tr                     
                            key={row.kishiNumber}
                            onClick={() => navigate(`/players/kishi/${row.kishiNumber}`)}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <td className="px-3 py-3.5 text-left text-gray-500 text-sm">{row.rank}</td>
                            <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex items-center">
                                <img alt="" src={row.imageUrl} className="ml-2 size-10 object-cover rounded-full" />
                                <div className="ml-4">
                                    <div className="font-medium text-gray-900">{row.nameKana} 
                                    <span className="text-xs text-gray-500"> ({DateUtils.getCurrentAge(row.birthDate)}歳)</span>
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{row.rating.toFixed(0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </section>

            <section className="lg:col-span-1 lg:col-start-2 h-full flex flex-col">
                <div className="bg-white px-4 py-5 shadow sm:rounded-4xl sm:px-6 flex-1 flex flex-col">
                  <div className="justify-between items-start">
                    <h2 id="timeline-title" className="text-base font-semibold text-gray-900">
                      女流棋士
                    </h2>
                    <table className="mt-4 min-w-full divide-y divide-gray-300">
                      <thead>
                      <tr>
                          <th className="px-3 py-3.5 text-left">順位</th>
                          <th className="px-3 py-3.5 text-left">名前</th>
                          <th className="px-3 py-3.5 text-center">レート</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {joryuWithRating.map((row) => (
                          <tr                     
                            key={row.kishiNumber}
                            onClick={() => navigate(`/players/joryu/${row.kishiNumber}`)}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <td className="px-3 py-3.5 text-left text-gray-500 text-sm">{row.rank}</td>
                            <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex items-center">
                                <img alt="" src={row.imageUrl} className="ml-2 size-10 object-cover rounded-full" />
                                <div className="ml-4">
                                    <div className="font-medium text-gray-900">{row.nameKana} 
                                    <span className="text-xs text-gray-500"> ({DateUtils.getCurrentAge(row.birthDate)}歳)</span>
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{row.rating.toFixed(0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </section>

            <section className="lg:col-span-2 lg:col-start-1 h-full flex flex-col">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 flex-1 flex flex-col">
                  <div className="justify-between items-start">
                    <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                      注目の対局結果
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
                        {getPickedUpRecentGames().map((row) => (
                          <tr                     
                            key={row.game_id}
                            onClick={() => navigate(`/players/kishi/${row.sente_player_number}`)}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <td className="px-3 py-3.5 text-left text-gray-500 text-sm">{extractDisplayGameName(row.game_name)}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{DateUtils.formatShortDate(row.date[0])}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{ResultStatusIcon(row.sente_player_result)}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm underline">{row.sente_player_name}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{row.sente_rating.toFixed(0)}</td>
                            <td className="px-3 py-3.5 text-center text-gray-500 text-sm">{row.gote_player_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
        </div>
    );
  }
  