<template>
  <div class="container col-12">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center">DNJ Geek - Criar Conta</div>
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
                <label for="mobilePhone" class="form-label">Celular</label>
                <input type="text" class="form-control" id="mobilePhone" v-model="mobilePhone" v-phone-mask required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Cadastrar</button>
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

const name = ref('')
const email = ref('')
const mobilePhone = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const register = async () => {
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      mobilePhone: mobilePhone.value,
      password: password.value
    })
    alert('Cadastro realizado com sucesso! Você será redirecionado para o login.')
    router.push({ name: 'login' })
  } catch (error) {
    alert('Não foi possível realizar o cadastro. Verifique seus dados.')
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>