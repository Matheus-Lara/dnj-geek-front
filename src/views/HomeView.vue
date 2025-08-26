<template>
  <div class="container col-12">
    <h1>Home</h1>
    <p>Você está na página principal!</p>
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
</style>