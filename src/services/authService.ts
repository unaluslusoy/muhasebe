import { api } from './api'
import { LoginResponse, RegisterResponse, User } from '@/types/auth'

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    localStorage.setItem('token', response.token)
    return response
  },

  register: async (userData: { name: string; email: string; password: string }): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', userData)
    localStorage.setItem('token', response.token)
    return response
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token')
    await api.post('/auth/logout')
  },

  getCurrentUser: async (): Promise<User> => {
    return api.get<User>('/auth/me')
  }
}
