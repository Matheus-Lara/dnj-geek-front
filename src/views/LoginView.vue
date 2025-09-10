<template>
  <div class="container col-12">
    <div class="row justify-content-center text-center">
      <h1>Boas vindas, herói!</h1>
    </div>
    <br></br>
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header bg-secondary text-center text-white">Faça login para continuar</div>
          <div class="card-body text-secondary">
            <form @submit.prevent="login">
              <div class="md-12">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </button>
              <div class="text-center mt-3">
                <span>Nunca acessou o nosso espaço? <a class="text-primary" @click="router.push({ name: 'register', query: router.currentRoute.value.query })">Registre-se aqui rapidinho</a></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const login = async () => {
  loading.value = true
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })

    router.push({ path: '/home', query: router.currentRoute.value.query })
  } catch (error) {
    let errorMessage = error as { response: { data: { error: {message: string} } } }

    alert(errorMessage.response.data.error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>