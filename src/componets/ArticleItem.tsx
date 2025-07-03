import type { Article } from "../types/article";

interface ArticleItemProps {
    article: Article;
}

export default function ArticleItem({article}: ArticleItemProps) {
    return (
        <div>
            {article.title}
        </div>
    )
}