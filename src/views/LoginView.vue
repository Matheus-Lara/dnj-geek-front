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
              <button type="submit" class="btn btn-primary w-100">Entrar</button>
              <div class="text-center mt-3">
                <span>Nunca acessou o nosso espaço? <router-link to="/register">Registre-se aqui rapidinho</router-link></span>
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

const login = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })

    router.push({ path: '/home', query: router.currentRoute.value.query })
  } catch (error) {
    alert('Email ou senha inválidos.')
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>