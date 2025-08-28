<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">DNJ Geek</a>
      <div v-if="isAuthenticated" class="d-flex">
        <span class="navbar-text me-3">
          Olá, {{ userName }}
        </span>
        <button class="btn btn-outline-danger" @click="logout">Sair</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const authStore = useAuthStore()
const userStore = useUserStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => userStore.user?.name || 'Usuário')

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>