<template>
  <div class="text-center">
    <h2 class="semibold">Que a força esteja com você, {{ userName.split(' ')[0] }}!</h2>
    <div v-if="user" class="stats-container mt-4">
      <div class="stat-card">
        <h2>Pontos totais</h2>
        <p>{{ user.totalPoints }}</p>
      </div>
      <div class="stat-card">
        <h2>Colecionáveis encontrados</h2>
        <p>{{ user.collectibles.length }}</p>
      </div>
    </div>
    <CollectibleList v-if="user" :collectibles="user.collectibles" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import CollectibleList from '@/components/CollectibleList.vue'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const collectibleId = route.query.c as string
  if (collectibleId) {
    router.push({ name: 'collectible', query: { c: collectibleId } })
  }
})

const user = computed(() => userStore.user)
const userName = computed(() => user.value?.name || 'usuário')
</script>

<style scoped>
.semibold {
  font-weight: 700;
}
.stats-container {
  display: flex;
  gap: 20px;
}
.stat-card {
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
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
  margin-bottom: 5px;
  font-size: 1rem;
}
.stat-card p {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
  }
}
</style>