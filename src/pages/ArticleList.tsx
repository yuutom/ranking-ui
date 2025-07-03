import { useLocation, useNavigate } from 'react-router-dom'
import { dummyArticles } from '../data/articles'
import { DateUtils } from '../utils/DateUtils'
import type { Article } from '../types/article'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function ArticleList() {

  const navigate = useNavigate()
  const handleCategoryClick = (category: string) => {
    navigate(`/articles?category=${encodeURIComponent(category)}`)
  }
  const categories: string[] = ["棋士・棋戦", "勉強", "雑学", "エンタメ"]

  const query = useQuery()
  const selectedCategory = query.get('category')

  const filteredArticles: Article[] = selectedCategory
    ? dummyArticles.filter((article) => article.category === selectedCategory)
    : dummyArticles

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
                <ul
                role="list"
                className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                >
                {filteredArticles.map((article) => (
                    <li key={article.id} className="relative items-center justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                        <div className="flex min-w-0 gap-x-4 items-center">
                            <div className="min-w-0 flex-auto">
                            <p className="text-base font-semibold text-gray-900">
                                <a href={`/articles/${article.id}`}>
                                <span className="absolute inset-x-0 -top-px bottom-0" />
                                {article.title}
                                </a>
                            </p>
                            </div>
                        </div>
                        {/* サムネ + 本文 + 投稿日 */}
                        <div className="mt-3 flex gap-x-4 items-start">
                            <img
                            src={article.imageUrl}
                            alt=""
                            className="w-30 h-auto rounded object-cover flex-none bg-gray-100"
                            />
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <p className="px-4 text-sm text-gray-500 line-clamp-2">{article.content}</p>
                            <div className="mt-4 mr-4 flex items-center justify-end gap-x-2 text-gray-500">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 sm:size-5"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                                </svg>
                                <span className="text-xs text-gray-500">
                                {DateUtils.formatShortDateTime(article.createdDate)}
                                </span>
                            </div>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
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
