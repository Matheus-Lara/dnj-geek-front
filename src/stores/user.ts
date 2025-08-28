import { defineStore } from 'pinia'
import type { Collectible } from '@/types'

export interface User {
  id: number
  name: string
  email: string
  mobilePhone: string
  userType: string
  emailConfirmedAt: string | null
  totalPoints: number
  totalItems: number
  collectibles: Collectible[]
  tag: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('userData') || 'null') as User | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
      localStorage.setItem('userData', JSON.stringify(user))
    },
    updateUserCollectibles(data: {
      totalPoints: number
      totalItems: number
      collectibles: Collectible[]
    }) {
      if (this.user) {
        const updatedUser = {
          ...this.user,
          totalPoints: data.totalPoints,
          totalItems: data.totalItems,
          collectibles: data.collectibles
        }
        this.setUser(updatedUser)
      }
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('userData')
    }
  }
})