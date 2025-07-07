import KishiInfo from '../componets/KishiInfo'
import { jsonJoryu } from '../data/playersJson'
import { Danni } from '../enum/Danni'

export default function JoryuList() {
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
            {jsonJoryu.filter((player) => player.title.length > 0).map((player) => (
                <KishiInfo key={player.id} kishi={player} />
              ))}
          </ul>
        </div>
      </>
    )}

    {jsonJoryu.filter((player) => player.danni === Danni.JORYU_DAN5 && player.title.length == 0).length > 0 && (
      <>
        <div className="relative mt-4">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-3 text-base font-semibold text-gray-900">{Danni.JORYU_DAN5}</span>
          </div>
        </div>

        <div className="mt-4">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jsonJoryu
              .filter((player) => player.danni === Danni.JORYU_DAN5 && player.title.length == 0)
              .map((player) => (
                <KishiInfo key={player.id} kishi={player} />
              ))}
          </ul>
        </div>
      </>
    )}

    {jsonJoryu.filter((player) => player.danni === Danni.JORYU_DAN4 && player.title.length == 0).length > 0 && (
      <>
        <div className="relative mt-4">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-3 text-base font-semibold text-gray-900">{Danni.JORYU_DAN4}</span>
          </div>
        </div>

        <div className="mt-4">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jsonJoryu
              .filter((player) => player.danni === Danni.JORYU_DAN4 && player.title.length == 0)
              .map((player) => (
                <KishiInfo key={player.id} kishi={player} />
              ))}
          </ul>
        </div>
      </>
    )}

    </main>
  )
}
