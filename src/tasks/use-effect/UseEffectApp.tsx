import { useEffect, useState } from 'react'
import Details from './Details'
import List from './List'
import type { UserListItem } from './types'
import './use-effect.css'

const USERS_URL =
  'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'

function UseEffectApp() {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [selected, setSelected] = useState<UserListItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch(USERS_URL)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data = (await response.json()) as UserListItem[]
        if (!cancelled) {
          setUsers(data)
        }
      } catch {
        if (!cancelled) {
          setUsers([])
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
  }, [])

  return (
    <div className="use-effect-app">
      <List
        users={users}
        selectedId={selected?.id ?? null}
        onSelect={setSelected}
        loading={loading}
      />
      <Details info={selected} />
    </div>
  )
}

export default UseEffectApp
