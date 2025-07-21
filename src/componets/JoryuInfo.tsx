import { Link } from "react-router-dom";
import type { Player } from "../types/player";
import { Title } from "../enum/Title";
import { getSlug } from "../enum/PlayerCategory";

interface JoryuInfoProps {
    kishi: Player;
}

export default function JoryuInfo({kishi}: JoryuInfoProps) {
  const displayTitle: string = (() => {
    if (Array.isArray(kishi?.title) && kishi.title.length > 0) {
      const hasRyuoh = kishi.title.includes(Title.RYUOH);
      const hasMeijin = kishi.title.includes(Title.MEIJIN);
  
      if (hasRyuoh && hasMeijin) {
        return "竜王・名人";
      }
      if (hasRyuoh) {
        return "竜王";
      }
      if (hasMeijin) {
        return "名人";
      }
      return kishi.title[0]; // その他のタイトルの1つ目を表示
    }
    return kishi?.danni ?? ""; // タイトルがない場合は段位を表示
  })();

    return (
        <Link to={`/players/${getSlug(kishi.playerCategory)}/${kishi.kishiNumber}`}>
        <li key={kishi.kishiNumber} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:bg-gray-100 transition-colors duration-200">
          <div className="flex w-full items-center justify-between space-x-6 px-6 pb-6 pt-4">
            <div className="flex-1 truncate">
              <span className="mb-1 inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {displayTitle}
              </span>
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{kishi.nameKana}</h3>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{kishi.nameRome}</p>
            </div>
            <img alt="" src={kishi.imageUrl} className="size-20 object-cover rounded-full bg-gray-300" />
          </div>
        </li>
        </Link>
    )
}