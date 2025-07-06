import KishiInfo from '../componets/KishiInfo'
import { jsonKishi } from '../data/playersJson'
import { Danni } from '../enum/Danni'

export default function PlayerList() {
  return (
    <main className="max-w-screen-md mx-auto">
    {jsonKishi.filter((kishi) => kishi.title.length > 0).length > 0 && (
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
            {jsonKishi.filter((kishi) => kishi.title.length > 0).map((kishi) => (
                <KishiInfo key={kishi.id} kishi={kishi} />
              ))}
          </ul>
        </div>
      </>
    )}

    {jsonKishi.filter((kishi) => kishi.danni === Danni.DAN9 && kishi.title.length == 0).length > 0 && (
      <>
        <div className="relative mt-4">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-3 text-base font-semibold text-gray-900">九段</span>
          </div>
        </div>

        <div className="mt-4">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jsonKishi
              .filter((kishi) => kishi.danni === Danni.DAN9 && kishi.title.length == 0)
              .map((kishi) => (
                <KishiInfo key={kishi.id} kishi={kishi} />
              ))}
          </ul>
        </div>
      </>
    )}

    {jsonKishi.filter((kishi) => kishi.danni === Danni.DAN8 && kishi.title.length == 0).length > 0 && (
      <>
        <div className="relative mt-4">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-3 text-base font-semibold text-gray-900">八段</span>
          </div>
        </div>

        <div className="mt-4">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jsonKishi
              .filter((kishi) => kishi.danni === Danni.DAN8 && kishi.title.length == 0)
              .map((kishi) => (
                <KishiInfo key={kishi.id} kishi={kishi} />
              ))}
          </ul>
        </div>
      </>
    )}

    </main>
  )
}
