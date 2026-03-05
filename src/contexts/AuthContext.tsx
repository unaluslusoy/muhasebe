import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/types/auth'
import { authService } from '@/services/authService'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const user = await authService.getCurrentUser()
          setUser(user)
        } catch (error) {
          console.error('Failed to fetch user', error)
          localStorage.removeItem('token')
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token)
    setUser(user)
  }

  const logout = () => {
    authService.logout()
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
