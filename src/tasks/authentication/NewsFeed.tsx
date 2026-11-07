import { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import NewsCard from './NewsCard'
import type { NewsItem } from './types'

function NewsFeed() {
  const { fetchWithAuth } = useAuth()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchWithAuth('/private/news')
        if (cancelled) return
        if (!response.ok) {
          if (response.status !== 401) {
            setError(`Failed to load news (${response.status})`)
          }
          return
        }
        const data = (await response.json()) as NewsItem[]
        setNews(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load news')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [fetchWithAuth])

  if (loading) {
    return <p className="auth-feed-status">Loading news…</p>
  }

  if (error) {
    return <p className="auth-feed-status auth-feed-status--error">{error}</p>
  }

  return (
    <div className="auth-news-grid">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default NewsFeed
