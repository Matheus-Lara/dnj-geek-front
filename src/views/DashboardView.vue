<template>
  <div class="container mt-5">
    <h1>Dashboard</h1>
    <p>Bem-vindo à sua página principal!</p>
    <button @click="handleLogout" class="btn btn-danger">Sair</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>
/* Estilos específicos do dashboard aqui */
</style>