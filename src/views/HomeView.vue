<template>
  <div>
    <h1>Que a força esteja com você, {{ userName.split(' ')[0] }}!</h1>
    <div v-if="user" class="stats-container mt-4">
      <div class="stat-card">
        <h2>Seus pontos</h2>
        <p>{{ user.totalPoints }}</p>
      </div>
      <div class="stat-card">
        <h2>Colecionáveis Obtidos</h2>
        <p>{{ user.collectibles.length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const user = computed(() => userStore.user)
const userName = computed(() => user.value?.name || 'usuário')
</script>

<style scoped>
.stats-container {
  display: flex;
  gap: 20px;
}
.stat-card {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex-grow: 1;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.stat-card:nth-child(1) {
  background-color: #28a745;
}
.stat-card:nth-child(2) {
  background-color: #419af9;
}
.stat-card h2 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}
.stat-card p {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
  }
}
</style>