import { useAuth } from './AuthContext'
import LoginForm from './LoginForm'

function Toolbar() {
  const { profile, logout } = useAuth()

  return (
    <header className="auth-toolbar">
      <div className="auth-toolbar__brand">Neto Social</div>
      {profile ? (
        <div className="auth-toolbar__profile">
          <span>Hello, {profile.name}</span>
          <img
            className="auth-toolbar__avatar"
            src={profile.avatar}
            alt={profile.name}
          />
          <button
            type="button"
            className="auth-btn auth-btn--logout"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <LoginForm />
      )}
    </header>
  )
}

export default Toolbar
