import { create } from 'zustand'

const useAuth = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  setAuth: (user, token) => {
    if (token) localStorage.setItem('token', token)
    set({ user, token })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  }
}))

export default useAuth
