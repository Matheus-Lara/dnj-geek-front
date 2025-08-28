<template>
  <div class="collectible-card" :class="cardClass">
    <span class="rarity-label" :class="labelClass">{{ rarityLabelText }}</span>
    <img :src="collectible.image" :alt="collectible.name" class="collectible-image" />
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { Collectible } from '@/types'

const props = defineProps<{
  collectible: Collectible
}>()

const { collectible } = toRefs(props)

const cardClass = computed(() => {
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
.collectible-card {
  position: relative;
  border: 5px solid;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  aspect-ratio: 1 / 1;
}
.collectible-card:hover {
  transform: scale(1.05);
}
.common {
  border-color: #a9a9a9; /* Cinza Neutro */
}
.rare {
  border-color: #419af9; /* Azul Chamativo */
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
  display: block;
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
</style>