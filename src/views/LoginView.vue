<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="md-12">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Entrar</button>
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
import apiClient from '@/services/api' // Importando o nosso serviço de API

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await apiClient.post('/user/auth/login', {
      email: email.value,
      password: password.value
    })

    const token = response.token

    console.log('Login bem-sucedido, token:', token)

    // TODO: Salvar o token no state (Pinia)

    router.push('/dashboard')
  } catch (error) {
    console.error('Erro no login:', error)
    alert('Email ou senha inválidos.')
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>