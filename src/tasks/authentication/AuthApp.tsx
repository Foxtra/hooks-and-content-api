import { AuthProvider, useAuth } from './AuthContext'
import Landing from './Landing'
import NewsFeed from './NewsFeed'
import Toolbar from './Toolbar'
import './auth.css'

function AuthContent() {
  const { profile } = useAuth()

  return (
    <div className="auth-app">
      <p className="auth-app__hint">
        Start the backend: <code>npm run backend:auth</code> (port 7071). Login:{' '}
        <code>vasya</code> / <code>password</code>
      </p>
      <Toolbar />
      <div className="auth-app__content">
        {profile ? <NewsFeed /> : <Landing />}
      </div>
    </div>
  )
}

function AuthApp() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  )
}

export default AuthApp
