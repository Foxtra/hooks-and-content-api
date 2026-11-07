import type { UserListItem } from './types'

interface ListProps {
  users: UserListItem[]
  selectedId: number | null
  onSelect: (user: UserListItem) => void
  loading: boolean
}

function List({ users, selectedId, onSelect, loading }: ListProps) {
  if (loading) {
    return <div className="use-effect-list">Loading users…</div>
  }

  return (
    <ul className="use-effect-list">
      {users.map((user) => (
        <li key={user.id}>
          <button
            type="button"
            className={
              selectedId === user.id
                ? 'use-effect-list__item use-effect-list__item--active'
                : 'use-effect-list__item'
            }
            onClick={() => onSelect(user)}
          >
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default List
