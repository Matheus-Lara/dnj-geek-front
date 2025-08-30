<template>
  <div class="container col-12">
    <div class="row justify-content-center">
      <div v-if="isFirstAccess" class="alert alert-info">
        Jovem herói! Parece que você é novo por aqui! Vamos começar?
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center">DNJ Geek - Registro</div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="name" class="form-label">Nome Completo</label>
                <input type="text" class="form-control" id="name" v-model="name" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="mobilePhone" class="form-label">Celular (WhatsApp)</label>
                <input type="text" class="form-control" id="mobilePhone" v-model="mobilePhone" v-phone-mask required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
              </button>
              <div class="text-center mt-3">
                <span>Já tem uma conta? <a class="text-primary" @click="router.push({ name: 'login', query: router.currentRoute.value.query })">Faça login aqui</a></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const name = ref('')
const email = ref('')
const mobilePhone = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const isFirstAccess = computed(() => {
  return !localStorage.getItem('hasVisited')
})

const register = async () => {
  loading.value = true
  try {
    const credentials = {
      name: name.value,
      email: email.value,
      mobilePhone: mobilePhone.value,
      password: password.value
    }
    await authStore.register(credentials)

    await authStore.login({
      email: credentials.email,
      password: credentials.password
    })

    router.push({ name: 'home', query: router.currentRoute.value.query })
  } catch (error: any) {
    let errorMessage = 'Não foi possível realizar o cadastro. Verifique seus dados.'
    if (error && error.error && error.error.fields) {
      const fieldErrors = error.error.fields.map((field: { field: string; message: string }) => field.message).join('\n')
      errorMessage = `${error.error.message}\n${fieldErrors}`
    }
    alert(errorMessage)
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