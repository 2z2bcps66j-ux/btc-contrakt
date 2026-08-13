import { create } from 'zustand'
import axios from 'axios'

interface AuthState {
  isAuthenticated: boolean
  user: any
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
  initializeAuth: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,

  initializeAuth: () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      set({ isAuthenticated: true, token, user: JSON.parse(user) })
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      set({ isAuthenticated: true, token: data.token, user: data.user })
    } catch (error) {
      throw new Error('Anmeldung fehlgeschlagen')
    }
  },

  register: async (email: string, username: string, password: string) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        email,
        username,
        password,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      set({ isAuthenticated: true, token: data.token, user: data.user })
    } catch (error) {
      throw new Error('Registrierung fehlgeschlagen')
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    set({ isAuthenticated: false, user: null, token: null })
  },
}))

export default useAuthStore
