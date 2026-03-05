export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterResponse {
  user: User
  token: string
}
