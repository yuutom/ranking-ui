import KishiInfo from '../componets/KishiInfo'
import { jsonKishi } from '../data/playersJson'
import { Danni } from '../enum/Danni'

export default function PlayerList() {
  const orderedDanni: Danni[] = [
    Danni.DAN9,
    Danni.DAN8,
    Danni.DAN7,
    Danni.DAN6,
    Danni.DAN5,
    Danni.DAN4,
  ];
  return (
    <main className="max-w-screen-md mx-auto">
    {jsonKishi.filter((kishi) => kishi.title.length > 0).length > 0 && (
      <>
        <div className="relative mb-20">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-3 text-xl font-semibold text-gray-900">タイトル保持者</span>
          </div>
        </div>

        <div className="mt-4">
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jsonKishi
              .filter((kishi) => kishi.title.length > 0)
              .map((kishi) => (
                <KishiInfo key={kishi.id} kishi={kishi} />
              ))}
          </ul>
        </div>
      </>
    )}

    {orderedDanni.map((danni) => {
      const filteredKishi = jsonKishi.filter(
        (kishi) => kishi.danni === danni && kishi.title.length === 0
      );

      if (filteredKishi.length === 0) return null;

      return (
        <div key={danni}>
          <div className="relative my-20">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white pr-3 text-xl font-semibold text-gray-900">{danni}</span>
            </div>
          </div>

          <div className="mt-4">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredKishi.map((kishi) => (
                <KishiInfo key={kishi.id} kishi={kishi} />
              ))}
            </ul>
          </div>
        </div>
      );
    })}
    </main>
  );
}
