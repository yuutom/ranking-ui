import { dummyPickedUpGames } from "../data/games";
import { DateUtils } from "../utils/DateUtils";
import { ResultStatusIcon } from "../componets/ResultStatusIcon";
import { ResultStatus } from "../enum/ResultStatus";

export default function Home() {

    return (
        <main className="py-10">
        <div className="mt-20 max-w-screen-md mx-auto">
            <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-base font-semibold text-gray-900">注目の対局</span>
                </div>
            </div>
        </div>

        <div className="mt-6 mx-auto max-w-screen-md">
            <div className="flex item-center text-center mt-4 mb-4 mr-4 px-4 justify-end space-x-4">
                <div className="flex space-x-2">
                    {ResultStatusIcon(ResultStatus.WIN)}
                    <span className="size-1.5 text-xs text-gray-500">勝</span>
                </div>
                <div className="flex space-x-2">
                    {ResultStatusIcon(ResultStatus.DEFEATE)}
                    <span className="size-1.5 text-xs text-gray-500">負</span>
                </div>
                <div className="flex space-x-2">
                    {ResultStatusIcon(ResultStatus.TBD)}
                    <span className="size-1.5 text-xs text-gray-500">未</span>
                </div>
            </div>
        <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        >
        {dummyPickedUpGames.map((game) => (
            <li className="grid grid-cols-13 items-center px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div className="col-span-2 text-gray-500 text-sm">{game.gameName}</div>
            {/* 先手 */}
            <div className="col-span-3 flex items-center gap-x-4 justify-center">
                <img
                alt=""
                src={`https://www.shogi.or.jp/images/player/pro/${game.senteNumber}.jpg`}
                className="size-11 object-cover rounded-full bg-gray-50"
                />
                <div className="flex">
                <p className="text-sm font-semibold text-gray-900">
                    <a href={`/players/${game.senteNumber}`} className="hover:underline">
                    {game.senteName}
                    </a>
                </p>
                </div>
            </div>

            <div className="col-span-1 flex items-center gap-x-1.5">
                {ResultStatusIcon(game.senteResult)}
            </div>

            {/* vs */}
            <div className="col-span-1 text-sm text-center font-medium text-gray-500">vs</div>

            <div className="col-span-1 mt-1 flex items-center gap-x-1.5 justify-end">
                {ResultStatusIcon(game.goteResult)}
            </div>

            {/* 後手 */}
            <div className="col-span-3 flex items-center gap-x-4 justify-center">
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                        <a href={`/players/${game.goteNumber}`} className="hover:underline">
                        {game.goteName}
                        </a>
                    </p>
                </div>
                <img
                    alt=""
                    src={`https://www.shogi.or.jp/images/player/pro/${game.goteNumber}.jpg`}
                    className="size-11 object-cover rounded-full bg-gray-50"
                />
            </div>
            
            <div className="col-span-2 text-right text-sm text-gray-500">{DateUtils.formatJapaneseDateWithWeekday(game.date)}</div>
            </li>

        ))}
        </ul>
        </div>

        <div className="mt-20 max-w-screen-md mx-auto">
            <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-base font-semibold text-gray-900">記事一覧</span>
                </div>
            </div>
        </div>
        </main>
    );
  }
  