<template>
  <div class="claim-prize-container container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Resgate de Prêmios</h2>
        <div class="input-group mt-3">
          <input
            type="text"
            v-model="userTag"
            class="form-control"
            placeholder="Digite a tag do jovem"
          />
          <button class="btn btn-primary" @click="claimPrize">Resgatar</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-md-6">
        <h2 class="text-center">Últimas tags resgatadas</h2>
        <div class="mt-3">
          <ul class="list-group">
            <li class="list-group-item" v-for="tag in reversedLastTags" :key="tag">
              #{{ tag }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import prizeService from '@/services/prizeService'
import { ref, onMounted, computed } from 'vue'

const userTag = ref('')
const lastTags = ref<string[]>([])

const reversedLastTags = computed(() => [...lastTags.value].reverse())

const claimPrize = async () => {
  if (!userTag.value) {
    alert('Por favor, insira a tag do jovem.')
    return
  }
  try {
    const treatedUserTag = userTag.value.replace(/#/g, '')
    await prizeService.claimPrizeForUser(treatedUserTag)
    alert('Prêmio resgatado com sucesso para a tag: ' + treatedUserTag)

    lastTags.value.push(treatedUserTag)

    // limit to 10 items
    if (lastTags.value.length > 10) {
      lastTags.value.shift()
    }

    localStorage.setItem('lastProcessedTags', JSON.stringify(lastTags.value))

  } catch (error: any) {
    alert(
      error?.error?.message || 'Ocorreu um erro ao resgatar o prêmio. Verifique com o administrador.'
    )
  } finally {
    userTag.value = ''
  }
}

onMounted(() => {
  lastTags.value = JSON.parse(localStorage.getItem('lastProcessedTags') || '[]')
})
</script>

<style scoped>
.claim-prize-container {
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}
</style>