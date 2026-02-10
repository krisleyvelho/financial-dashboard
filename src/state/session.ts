import { User } from '@/lib/mocks/generators'
import { create } from 'zustand'

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

