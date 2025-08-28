<template>
  <div class="container">
    <div v-if="loading" class="text-center">
      <p>Resgatando seu colecionável...</p>
    </div>
    <div v-else-if="error" class="error-container">
      <h2>Ocorreu um Erro</h2>
      <p>{{ error }}</p>
      <button @click="router.push({ name: 'home' })" class="btn btn-primary">
        Voltar para Home
      </button>
    </div>
    <div v-else-if="collectible" class="collectible-container">
      <h1>Parabéns! Você resgatou:</h1>
      <div class="collectible-card" :class="cardClass">
        <span class="rarity-label" :class="labelClass">{{
          rarityLabelText
        }}</span>
        <img
          :src="collectible.image"
          :alt="collectible.name"
          class="collectible-image"
        />
      </div>
      <h2>{{ collectible.name }}</h2>
      <p class="description">{{ collectible.description }}</p>
      <p class="points">+{{ collectible.points }} pontos</p>
      <button @click="router.push({ name: 'home' })" class="btn btn-primary">
        Ver meus colecionáveis
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import collectibleService from '@/services/collectibleService'
import type { Collectible } from '@/types'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(true)
const collectible = ref<Collectible | null>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  const collectibleId = route.query.c as string
  if (collectibleId) {
    try {
      const response = await collectibleService.claimCollectible(collectibleId)
      collectible.value = response.claimedCollectible
      userStore.updateUserCollectibles({
        totalPoints: response.totalPoints,
        totalItems: response.totalItems,
        collectibles: response.collectibles
      })
    } catch (e: any) {
      error.value = e.error.message
    } finally {
      loading.value = false
    }
  }
})

const cardClass = computed(() => {
  if (!collectible.value) return ''
  switch (collectible.value.type) {
    case 'RARE':
      return 'rare'
    case 'LEGENDARY':
      return 'legendary'
    default:
      return 'common'
  }
})

const labelClass = computed(() => {
  if (!collectible.value) return ''
  switch (collectible.value.type) {
    case 'RARE':
      return 'label-rare'
    case 'LEGENDARY':
      return 'label-legendary'
    default:
      return 'label-common'
  }
})

const rarityLabelText = computed(() => {
  if (!collectible.value) return ''
  switch (collectible.value.type) {
    case 'RARE':
      return 'RARO'
    case 'LEGENDARY':
      return 'LENDÁRIO'
    case 'COMMON':
      return 'COMUM'
    default:
      return collectible.value.type
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
}
.loading-text {
  font-size: 1.5rem;
}
.error-container {
  text-align: center;
  background-color: #ffdddd;
  border-left: 6px solid #f44336;
  padding: 20px;
  border-radius: 8px;
  color: #333;
}
.collectible-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.collectible-card {
  position: relative;
  border: 5px solid;
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  height: 300px;
  margin: 20px 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.common {
  border-color: #a9a9a9;
}
.rare {
  border-color: #419af9;
}
.legendary {
  border-color: transparent;
  background-image: linear-gradient(45deg, #ffd700, #ff8c00, #ff4500, #e700fe);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.collectible-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rarity-label {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.label-common {
  background-color: #a9a9a9;
}
.label-rare {
  background-color: #419af9;
}
.label-legendary {
  background: linear-gradient(45deg, #ffd700, #ff8c00, #ff4500, #e700fe);
}
.description {
  max-width: 600px;
  margin: 20px 0;
}
.points {
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
}
</style>