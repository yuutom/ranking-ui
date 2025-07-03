import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { dummyArticles } from '../data/articles'
import type { Article } from '../types/article'
import { DateUtils } from '../utils/DateUtils'

export default function Article() {
  const { id } = useParams<{ id: string }>()
  const article: Article | undefined = dummyArticles.find(
    (a) => String(a.id) === id
  )
  if (!article) {
    return <div className="p-8 text-gray-500">記事が見つかりません</div>
  }
  const categories: string[] = ["棋士・棋戦", "勉強", "雑学", "エンタメ"]
  const navigate = useNavigate()
  const handleCategoryClick = (category: string) => {
    navigate(`/articles?category=${encodeURIComponent(category)}`)
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <main className="py-5">
          <div className="mx-auto mt-2 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-6 pt-6 sm:px-8">
                  <h1 className="text-2xl font-bold text-gray-900">{article.title}</h1>
                  <p className="mt-2 text-sm text-gray-500">
                    投稿日: {DateUtils.formatShortDateTime(article.createdDate)} / カテゴリ: 
                    <button onClick={() => handleCategoryClick(article.category)} className="ml-1 text-blue-600 font-medium cursor-pointer">{article.category}</button>
                  </p>
                </div>
                <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
                  <div className="mb-6">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full max-h-[500px] object-cover rounded-md"
                    />
                  </div>
                  <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-900">
                    {article.content}
                  </div>
                </div>
              </div>
              </section>
            </div>

            <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  カテゴリ一覧
                </h2>
                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                <ul role="list" className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button onClick={() => handleCategoryClick(category)} className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm font-medium text-blue-600">
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
