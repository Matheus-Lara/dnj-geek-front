<template>
  <div class="text-center">
    <h2 class="semibold">Que a força esteja com você, {{ userName.split(' ')[0] }}!</h2>
    <ClaimPrize v-if="isAdmin" />
    <div v-else>
      <div v-if="stats" class="card my-4 mx-auto">
        <div class="card-header">Charadas secretas! EJC Curitiba</div>
        <div class="card-body">
          <p class="card-text">
            Perguntas respondidas: {{ stats.answeredQuestionsQuantity }}
          </p>
          <p class="card-text">
            Perguntas restantes: {{ stats.remainingQuestionsQuantity }}
          </p>
        </div>
      </div>

      <div v-if="user" class="stats-container mt-4">
        <div class="stat-card">
          <h2>Pontos totais</h2>
          <p>{{ user.totalPoints }} de 7500</p>
        </div>
        <div class="stat-card">
          <h2>Colecionáveis encontrados</h2>
          <p>{{ user.collectibles.length }} de 150</p>
        </div>
        <div class="stat-card">
          <h2>Pontos necessários para resgatar um prêmio</h2>
          <p>3000</p>
        </div>
      </div>
      <CollectibleList v-if="user" :collectibles="user.collectibles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import CollectibleList from '@/components/CollectibleList.vue'
import ClaimPrize from '@/components/ClaimPrize.vue'
import { useRoute, useRouter } from 'vue-router'
import { useSecretQuestionStore } from '@/stores/secretQuestion'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const secretQuestionStore = useSecretQuestionStore()
const { stats } = storeToRefs(secretQuestionStore)

onMounted(() => {
  const collectibleId = route.query.c as string
  if (collectibleId) {
    router.push({ name: 'collectible', query: { c: collectibleId } })
    return
  }
})

const user = computed(() => userStore.user)
const userName = computed(() => user.value?.name || 'usuário')
const isAdmin = computed(() => user.value?.userType === 'ADMIN')
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
.stat-card:nth-child(3) {
  background-color: #7c7c7c;
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