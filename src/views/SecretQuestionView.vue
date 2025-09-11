<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSecretQuestionById, submitSecretQuestionAnswer } from '@/services/secretQuestionService'
import type { SecretQuestion, SecretQuestionAnswerResponse } from '@/types'
import { useUserStore } from '@/stores/user'
import { useSecretQuestionStore } from '@/stores/secretQuestion'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const secretQuestionStore = useSecretQuestionStore()
const question = ref<SecretQuestion | null>(null)
const error = ref<{ message: string } | null>(null)
const selectedAnswer = ref<string | null>(null)
const answerResult = ref<SecretQuestionAnswerResponse | null>(null)

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

const submitAnswer = async () => {
  if (!selectedAnswer.value) {
    alert('Por favor, selecione uma resposta.')
    return
  }

  const questionId = route.params.questionId as string
  try {
    const result = await submitSecretQuestionAnswer(questionId, selectedAnswer.value)
    answerResult.value = result

    if (userStore.user) {
      const userProgressKey = `secretQuestionProgress_${userStore.user.id}`
      const { isCorrect, ...stats } = result
      localStorage.setItem(userProgressKey, JSON.stringify(stats))
      secretQuestionStore.setStats(stats)
    }
    question.value = null
  } catch (err: any) {
    error.value = err.response.data.error
    alert(error.value?.message)
    router.push('/home')
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="alert alert-info" role="alert" v-if="!answerResult && question">
      <h4 class="alert-heading">Opa! Você encontrou uma charada secreta!</h4>
      <p>
        Os DOIS primeiros a responderem as 5 charadas corretamente, levarão um
        <strong>Kit EJC</strong> que contempla a Inscrição para o EJC + Kit: ecobag, funko Nossa
        Senhora das Graças, camiseta, copo, terço. <br />
        <strong>Atenção:</strong> Caso você ganhe, você receberá uma mensagem em seu WhatsApp. Fique atento!
      </p>
    </div>

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
    <div v-else-if="answerResult" class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">Resultado</h5>
        <p v-if="answerResult.isCorrect" class="text-success">Resposta Correta!</p>
        <p v-else class="text-danger">Ah! Que pena! Você errou. Mas pode continuar tentando em outras charadas!</p>
        <p>Charadas já respondidas: {{ answerResult.answeredQuestionsQuantity }}</p>
        <p>Charadas restantes: {{ answerResult.remainingQuestionsQuantity }}</p>
        <button @click="router.push('/home')" class="btn btn-secondary mt-2">
          Voltar para Home
        </button>
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