const tacticsBooksForBigginer = [
    {
        name: "四間飛車を指しこなす本 1",
        author: "藤井 猛",
        imageUrl:
          "https://m.media-amazon.com/images/I/71olfwC4A+L._SY522_.jpg",
        bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
      },
      {
        name: "1手ずつ解説する角換わり棒銀",
        author: "真田 圭一",
        imageUrl:
          "https://m.media-amazon.com/images/I/51BBp27+KaL._SY445_SX342_PQ95_.jpg",
        bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
      },
]


const tesujiBooksForBigginer = [
    {
        name: "将棋・ひと目の手筋",
        author: "週刊将棋編",
        imageUrl:
          "https://m.media-amazon.com/images/I/91hXIAZc7qL._SY522_.jpg",
        bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
      },
      {
        name: "将棋・ひと目の寄せ",
        author: "週刊将棋編",
        imageUrl:
          "https://m.media-amazon.com/images/I/81ZHeAJLUpL._SY522_.jpg",
        bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
      },
]

const tsumeBooksForBigginer = [    
    {
        name: "3手詰ハンドブック 新版",
        author: "浦野 真彦",
        imageUrl:
          "https://m.media-amazon.com/images/I/71ZWjZQoUgL._SY522_.jpg",
        bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
      },
    {
      name: "5手詰ハンドブック 新版",
      author: "浦野 真彦",
      imageUrl:
        "https://m.media-amazon.com/images/I/71eW-GjiVHL._SY522_.jpg",
      bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
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
              We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
              best results for our clients.
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
  