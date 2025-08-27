import { defineStore } from 'pinia'
import apiClient from '@/services/api'
import router from '@/router' // Importando o router para o logout
import { useUserStore } from '@/stores/user'

export const useAuthStore = defineStore('auth', {
  // O estado inicial agora lê o token do localStorage
  state: () => ({
    token: localStorage.getItem('authToken') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials: { email: string; password: string }): Promise<void> {
      try {
        const response = await apiClient.post('/user/auth/login', credentials)
        const { token, user } = response.data

        if (token && user) {
          this.token = token
          localStorage.setItem('authToken', token)

          const userStore = useUserStore()
          userStore.setUser(user)
        } else {
          throw new Error('Token não encontrado na resposta da API')
        }
      } catch (error) {
        console.error('Falha na ação de login do Pinia:', error)
        throw error
      }
    },
    logout() {
      const userStore = useUserStore()
      this.token = null
      localStorage.removeItem('authToken')
      userStore.clearUser()
      router.push({ name: 'login' })
    }
  }
})