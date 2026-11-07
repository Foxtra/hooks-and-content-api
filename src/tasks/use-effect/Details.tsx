import { useEffect, useState } from 'react'
import type { UserDetails, UserListItem } from './types'

const DETAILS_URL =
  'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data'

interface DetailsProps {
  info: UserListItem | null
}

function Details({ info }: DetailsProps) {
  const [user, setUser] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!info) {
      setUser(null)
      setError(null)
      return
    }

    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${DETAILS_URL}/${info.id}.json`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data = (await response.json()) as UserDetails
        if (!cancelled) {
          setUser(data)
        }
      } catch (err) {
        if (!cancelled) {
          setUser(null)
          setError(err instanceof Error ? err.message : 'Failed to load')
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
  }, [info?.id])

  if (!info) {
    return null
  }

  if (loading) {
    return <div className="use-effect-details">Loading details…</div>
  }

  if (error) {
    return <div className="use-effect-details">Error: {error}</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="use-effect-details">
      <img
        className="use-effect-details__avatar"
        src={user.avatar}
        alt={user.name}
      />
      <h2 className="use-effect-details__name">{user.name}</h2>
      <dl className="use-effect-details__meta">
        <div>
          <dt>City</dt>
          <dd>{user.details.city}</dd>
        </div>
        <div>
          <dt>Company</dt>
          <dd>{user.details.company}</dd>
        </div>
        <div>
          <dt>Position</dt>
          <dd>{user.details.position}</dd>
        </div>
      </dl>
    </div>
  )
}

export default Details
