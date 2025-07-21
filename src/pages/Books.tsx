const tacticsBooksForBigginer = [
    {
        name: "四間飛車を指しこなす本 1",
        author: "藤井 猛",
        imageUrl:
          "https://m.media-amazon.com/images/I/71olfwC4A+L._SY522_.jpg",
        bio: "当代随一の四間飛車の使い手・藤井猛竜王が贈る四間飛車の定跡書。四間飛車で勝つイメージを作る、革命的棋書。",
      },
      {
        name: "1手ずつ解説する角換わり棒銀",
        author: "真田 圭一",
        imageUrl:
          "https://m.media-amazon.com/images/I/51BBp27+KaL._SY445_SX342_PQ95_.jpg",
        bio: "棒銀の魅力はなんといっても破壊力でしょう。飛車と銀と手持ちの角で、うまくいけば敵陣を突破することができます。また角換わり棒銀のもう一つの特徴は、手筋の宝庫であるということ。攻撃側、守備側ともに学ぶべき手筋が満載です",
      },
]


const tesujiBooksForBigginer = [
    {
        name: "将棋・ひと目の手筋",
        author: "週刊将棋編",
        imageUrl:
          "https://m.media-amazon.com/images/I/91hXIAZc7qL._SY522_.jpg",
        bio: "実戦に現れることが多い頻出の手筋を全部で208問ピックアップしており、実戦にもすぐに役立ちます。すべてが部分図での出題となっており、図面を多く用いているため読みやすく、一問ごとに強くなります。",
      },
      {
        name: "将棋・ひと目の寄せ",
        author: "週刊将棋編",
        imageUrl:
          "https://m.media-amazon.com/images/I/81ZHeAJLUpL._SY522_.jpg",
        bio: "寄せとは、終盤に玉を詰みへと導くことです。本書ではこの寄せを、「詰み」、「必死」、「受け」に分けて出題してあります。部分図なので考えやすく、自然と寄せの力が身につきます。「何を持てば詰む」や「双玉問題」といった応用の章もあり、問題は全部で200問。ひと目で急所に手が伸びるように、繰り返し解いてみることをおススメいたします。",
      },
]

const tsumeBooksForBigginer = [    
    {
        name: "3手詰ハンドブック 新版",
        author: "浦野 真彦",
        imageUrl:
          "https://m.media-amazon.com/images/I/71ZWjZQoUgL._SY522_.jpg",
        bio: "初心者にわかりやすく解説されており、答えの文章が簡潔で分かりやすい基礎を学ぶのに最適な詰将棋本です。解説が丁寧で初心者でも理解しやすい内容になっています。",
      },
    {
      name: "5手詰ハンドブック 新版",
      author: "浦野 真彦",
      imageUrl:
        "https://m.media-amazon.com/images/I/71eW-GjiVHL._SY522_.jpg",
      bio: "詰みの基本となる「3手一組」を覚えたら、次は応用へ進もう。基本の「3手の読み」から、より実戦的・本格的なレベルへ進んでいきます。本書はこうした考え方を養うための入門編として最適の一冊です。",
    },
  ]
  
  export default function Books() {
    return (
      <div className="bg-white py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-34l text-balance font-semibold tracking-tight text-gray-900 sm:text-5xl">
              級位者向け
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              主に級位者向けの棋書を紹介します。<br />
              戦法書・手筋書・詰将棋本を中心に、将棋の基本を学ぶための書籍を集めました。<br />
              これらの書籍を通じて、将棋の基本的な戦術や戦法を学び、実践に活かしていきましょう。
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {tacticsBooksForBigginer.map((book) => (
              <li key={book.name} className="px-3 py-3 flex flex-col gap-6 xl:flex-row hover:bg-gray-100 cursor-pointer">
                <img alt="" src={book.imageUrl} className="h-auto w-52 flex-none rounded-sm object-cover" />
                <div className="flex-auto">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">{book.name}</h3>
                  <p className="text-base/7 text-gray-600">{book.author}(著)</p>
                  <p className="mt-6 text-base/7 text-gray-600">{book.bio}</p>
                </div>
              </li>
            ))}
          </ul>


          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {tesujiBooksForBigginer.map((book) => (
              <li key={book.name} className="px-3 py-3 flex flex-col gap-6 xl:flex-row hover:bg-gray-100 cursor-pointer">
                <img alt="" src={book.imageUrl} className="h-auto w-52 flex-none rounded-sm object-cover" />
                <div className="flex-auto">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">{book.name}</h3>
                  <p className="text-base/7 text-gray-600">{book.author}(著)</p>
                  <p className="mt-6 text-base/7 text-gray-600">{book.bio}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {tsumeBooksForBigginer.map((book) => (
              <li key={book.name} className="px-3 py-3 flex flex-col gap-6 xl:flex-row hover:bg-gray-100 cursor-pointer">
                <img alt="" src={book.imageUrl} className="h-auto w-52 flex-none rounded-sm object-cover" />
                <div className="flex-auto">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">{book.name}</h3>
                  <p className="text-base/7 text-gray-600">{book.author}(著)</p>
                  <p className="mt-6 text-base/7 text-gray-600">{book.bio}</p>
                </div>
              </li>
            ))}
          </ul>


        </div>
      </div>
    )
  }
  