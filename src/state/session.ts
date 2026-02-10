import { create } from 'zustand'

export type User = {
  id: string
  name: string
  type: 'admin' | 'user'
}


interface SessionStore {
  user: User | undefined
  setUser: (user: User) => void
  resetUser: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: undefined }),
}))

