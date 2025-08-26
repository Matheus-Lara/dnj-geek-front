import { defineStore } from 'pinia'
import apiClient from '@/services/api'
import router from '@/router' // Importando o router para o logout

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
        const token = response.data.token

        if (token) {
          this.token = token
          localStorage.setItem('authToken', token)
        } else {
          throw new Error('Token não encontrado na resposta da API')
        }
      } catch (error) {
        console.error('Falha na ação de login do Pinia:', error)
        throw error
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('authToken') // Removendo do localStorage
      router.push({ name: 'login' }) // Redireciona para o login
    }
  }
})