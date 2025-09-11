import { defineStore } from 'pinia'
import type { User } from './user'

export interface SecretQuestionStats {
  answeredQuestionsQuantity: number
  remainingQuestionsQuantity: number
}

export const useSecretQuestionStore = defineStore('secretQuestion', {
  state: () => ({
    stats: null as SecretQuestionStats | null
  }),
  actions: {
    loadStatsForUser(user: User) {
      if (user) {
        const userProgressKey = `secretQuestionProgress_${user.id}`
        const statsFromStorage = localStorage.getItem(userProgressKey)
        if (statsFromStorage) {
          this.stats = JSON.parse(statsFromStorage)
        } else {
          this.stats = null
        }
      }
    },
    setStats(stats: SecretQuestionStats) {
      this.stats = stats
    },
    clearStats() {
      this.stats = null
    }
  }
})