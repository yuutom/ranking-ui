import KishiInfo from '../componets/KishiInfo'
import { jsonJoryu } from '../data/playersJson'
import { Danni } from '../enum/Danni'

export default function JoryuList() {
  // 表示順に並べた女流段位
  const orderedJoryuDanni: Danni[] = [
    Danni.JORYU_DAN6,
    Danni.JORYU_DAN5,
    Danni.JORYU_DAN4,
    Danni.JORYU_DAN3,
    Danni.JORYU_DAN2,
    Danni.JORYU_DAN0,
    Danni.JORYU_KTY1,
    Danni.JORYU_KTY2,
  ];

  return (
    <main className="max-w-screen-md mx-auto">
    {jsonJoryu.filter((player) => player.title.length > 0).length > 0 && (
      <>
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-3 text-base font-semibold text-gray-900">タイトル保持者</span>
          </div>
        </div>

        <div className="mt-4">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jsonJoryu
              .filter((player) => player.title.length > 0)
              .map((player) => (
                <KishiInfo key={player.id} kishi={player} />
              ))}
          </ul>
        </div>
      </>
    )}

    {orderedJoryuDanni.map((danni) => {
      const players = jsonJoryu.filter(
        (player) => player.danni === danni && player.title.length === 0
      );

      if (players.length === 0) return null;

      return (
        <div key={danni}>
          <div className="relative mt-4">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white pr-3 text-base font-semibold text-gray-900">{danni}</span>
            </div>
          </div>

          <div className="mt-4">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {players.map((player) => (
                <KishiInfo key={player.id} kishi={player} />
              ))}
            </ul>
          </div>
        </div>
      );
    })}
    </main>
  );
}
