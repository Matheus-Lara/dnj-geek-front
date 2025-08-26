<template>
  <div class="container col-12">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center">DNJ Geek - Login</div>
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

    // Se o login no store foi bem-sucedido, redireciona
    router.push('/home')
  } catch (error) {
    // O erro já foi logado pelo store, aqui apenas damos feedback ao usuário
    alert('Email ou senha inválidos.')
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>