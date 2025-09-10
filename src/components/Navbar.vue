<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" @click="router.push({ name: 'home' })">
            <img src="@/assets/navbar-logo.png" alt="DNJ Geek" height="20">
        </a>
        <div v-if="isAuthenticated" class="d-flex align-items-center">
            <div class="me-3 text-end text-light">
                <div>Olá, {{ userName.split(' ')[0] }}</div>
                <div v-if="userTag">
                    <span class="badge bg-primary">#{{ userTag }}</span>
                </div>
            </div>

            <router-link v-show="shouldShowQrCodeReader" :to="{ name: 'scanner', query: { autoStart: 'true' } }" class="btn btn-outline-light me-2">
                <i class="bi bi-qr-code-scan"></i>
            </router-link>

            <button class="btn btn-outline-light" @click="logout"><i class="bi bi-box-arrow-right"></i></button>
        </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const authStore = useAuthStore()
const userStore = useUserStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => userStore.user?.name || 'Usuário')
const userTag = computed(() => userStore.user?.tag)
const shouldShowQrCodeReader = computed(() => userStore.user?.userType == 'USER')

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #5446fe;
  font-size: 0.9rem;
}

.navbar-brand {
  border-radius: 4px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

</style>