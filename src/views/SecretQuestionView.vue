<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSecretQuestionById } from '@/services/secretQuestionService'
import type { SecretQuestion } from '@/types'

const route = useRoute()
const router = useRouter()
const question = ref<SecretQuestion | null>(null)
const error = ref<{ message: string } | null>(null)
const selectedAnswer = ref<string | null>(null)

onMounted(async () => {
  const questionId = route.params.questionId as string
  if (questionId) {
    try {
      question.value = await getSecretQuestionById(questionId)
    } catch (err: any) {
      error.value = err.response.data.error
      alert(error.value?.message)
      router.push('/home')
    }
  }
})

const submitAnswer = () => {
  console.log(selectedAnswer.value)
}
</script>

<template>
  <div class="container mt-5">
    <div v-if="question" class="card">
      <div class="card-header">
        <h1 class="card-title h5">{{ question.name }}</h1>
        <p class="card-subtitle mb-2 text-muted">{{ question.hint }}</p>
      </div>
      <div class="card-body">
        <div class="options list-group">
          <label
            v-for="(option, key) in question.options"
            :key="key"
            :for="String(key)"
            class="list-group-item"
          >
            <input
              type="radio"
              :id="String(key)"
              :value="key"
              name="secret-question"
              class="form-check-input me-1"
              v-model="selectedAnswer"
            />
            {{ option }}
          </label>
        </div>
        <button @click="submitAnswer" class="btn btn-primary mt-3">Responder</button>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger mt-3" role="alert">
      {{ error.message }}
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>