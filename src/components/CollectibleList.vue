<template>
  <div class="collectible-list-container mt-5">
    <h2>Meus Colecionáveis</h2>
    <div v-if="collectibles.length > 0" class="collectible-grid">
      <CollectibleCard
        v-for="collectible in collectibles"
        :key="collectible.name"
        :collectible="collectible"
        @click="viewCollectible(collectible)"
      />
    </div>
    <div v-else>
      <p>Você ainda não possui nenhum colecionável.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { Collectible } from '@/types'
import CollectibleCard from './CollectibleCard.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  collectibles: Collectible[]
}>()

const { collectibles } = toRefs(props)
const router = useRouter()

const viewCollectible = (collectible: Collectible) => {
  router.push({
    name: 'collectible',
    query: { c: collectible.name, view: 'true' }
  })
}
</script>

<style scoped>
.collectible-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
</style>