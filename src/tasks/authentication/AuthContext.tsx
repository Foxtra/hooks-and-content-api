import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Profile } from './types'

const API_BASE = 'http://localhost:7071'
const TOKEN_KEY = 'neto_social_token'
const PROFILE_KEY = 'neto_social_profile'

interface AuthContextValue {
  token: string | null
  profile: Profile | null
  login: (login: string, password: string) => Promise<void>
  logout: () => void
  fetchWithAuth: (path: string) => Promise<Response>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Profile
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY),
  )
  const [profile, setProfile] = useState<Profile | null>(() =>
    readStoredProfile(),
  )

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(PROFILE_KEY)
    setToken(null)
    setProfile(null)
  }, [])

  const fetchWithAuth = useCallback(
    async (path: string) => {
      const currentToken = localStorage.getItem(TOKEN_KEY)
      const response = await fetch(`${API_BASE}${path}`, {
        headers: {
          Authorization: `Bearer ${currentToken ?? ''}`,
        },
      })

      if (response.status === 401) {
        logout()
      }

      return response
    },
    [logout],
  )

  const login = useCallback(
    async (loginName: string, password: string) => {
      const response = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginName, password }),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          message?: string
        } | null
        throw new Error(body?.message ?? `Login failed (${response.status})`)
      }

      const { token: nextToken } = (await response.json()) as { token: string }
      localStorage.setItem(TOKEN_KEY, nextToken)
      setToken(nextToken)

      const meResponse = await fetch(`${API_BASE}/private/me`, {
        headers: { Authorization: `Bearer ${nextToken}` },
      })

      if (meResponse.status === 401) {
        logout()
        throw new Error('Unauthorized')
      }

      if (!meResponse.ok) {
        throw new Error('Failed to load profile')
      }

      const nextProfile = (await meResponse.json()) as Profile
      localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile))
      setProfile(nextProfile)
    },
    [logout],
  )

  useEffect(() => {
    if (!token || profile) return

    let cancelled = false

    const restore = async () => {
      const response = await fetchWithAuth('/private/me')
      if (cancelled) return
      if (!response.ok) {
        if (response.status !== 401) {
          logout()
        }
        return
      }
      const nextProfile = (await response.json()) as Profile
      if (!cancelled) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile))
        setProfile(nextProfile)
      }
    }

    void restore()

    return () => {
      cancelled = true
    }
  }, [token, profile, fetchWithAuth, logout])

  const value = useMemo(
    () => ({ token, profile, login, logout, fetchWithAuth }),
    [token, profile, login, logout, fetchWithAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
