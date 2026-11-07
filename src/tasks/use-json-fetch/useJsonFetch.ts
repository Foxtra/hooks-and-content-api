import { useEffect, useState } from 'react'

export function useJsonFetch<T>(
  url: string,
  opts?: RequestInit,
): [T | null, boolean, Error | null] {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const response = await fetch(url, opts)

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }

        const text = await response.text()
        try {
          const json = JSON.parse(text) as T
          if (!cancelled) {
            setData(json)
          }
        } catch {
          throw new Error('Failed to parse JSON')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)))
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
    // opts intentionally omitted: callers pass stable URLs; avoid refetch loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return [data, loading, error]
}
