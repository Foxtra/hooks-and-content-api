import { useState } from 'react'
import './App.css'
import UseEffectApp from './tasks/use-effect/UseEffectApp'
import UseJsonFetchApp from './tasks/use-json-fetch/UseJsonFetchApp'
import AuthApp from './tasks/authentication/AuthApp'

type TaskId = 'use-effect' | 'use-json-fetch' | 'authentication'

const tasks: { id: TaskId; label: string }[] = [
  { id: 'use-effect', label: 'useEffect' },
  { id: 'use-json-fetch', label: 'useJsonFetch' },
  { id: 'authentication', label: 'Authentication' },
]

function App() {
  const [active, setActive] = useState<TaskId>('use-effect')

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <span className="app-nav__title">Hooks &amp; Context</span>
        <div className="app-nav__tabs">
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              className={
                active === task.id
                  ? 'app-nav__tab app-nav__tab--active'
                  : 'app-nav__tab'
              }
              onClick={() => setActive(task.id)}
            >
              {task.label}
            </button>
          ))}
        </div>
      </nav>
      <main className="app-main">
        {active === 'use-effect' && <UseEffectApp />}
        {active === 'use-json-fetch' && <UseJsonFetchApp />}
        {active === 'authentication' && <AuthApp />}
      </main>
    </div>
  )
}

export default App
