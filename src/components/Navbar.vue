<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">DNJ Geek</a>
        <div v-if="isAuthenticated" class="d-flex align-items-center">
            <span class="navbar-text me-3">
            Olá, {{ userName }}
            </span>
            <span v-if="userTag" class="badge bg-primary me-3">
                #{{ userTag }}
            </span>
            <button class="btn btn-outline-danger" @click="logout"><i class="bi bi-box-arrow-right"></i></button>
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
const userTag = computed(() => userStore.user?.tag)

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.navbar-brand {
  border-radius: 4px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

</style>