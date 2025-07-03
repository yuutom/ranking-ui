import { Link } from "react-router-dom";
import type { Player } from "../types/player";

interface KishiInfoProps {
    kishi: Player;
}

export default function KishiInfo({kishi}: KishiInfoProps) {
    return (
        <Link to={`/players/${kishi.kishiNumber}`}>
        <li key={kishi.kishiNumber} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:bg-gray-100 transition-colors duration-200">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{kishi.nameKana}</h3>
                <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {kishi.danni}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{kishi.nameRome}</p>
            </div>
            <img alt="" src={kishi.imageUrl} className="size-16 object-cover rounded-full bg-gray-300" />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <span className="inline-flex shrink-0 items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  順
                </span>
                  {kishi.junisenClass}
                </div>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <span className="inline-flex shrink-0 items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                  竜
                </span>
                  {kishi.ryuohsenClass}
                </div>
              </div>
            </div>
          </div>
        </li>
        </Link>
    )
}