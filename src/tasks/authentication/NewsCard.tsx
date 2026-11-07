import type { NewsItem } from './types'

interface NewsCardProps {
  item: NewsItem
}

function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="auth-news-card">
      <img src={item.image} alt={item.title} />
      <div className="auth-news-card__body">
        <h3>{item.title}</h3>
        <p>{item.content}</p>
      </div>
    </article>
  )
}

export default NewsCard
