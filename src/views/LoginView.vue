<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
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

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  // Aqui você fará a chamada para a sua API de login
  // Por enquanto, vamos apenas simular um login bem-sucedido
  console.log('Email:', email.value)
  console.log('Password:', password.value)

  // Simulação de chamada de API e armazenamento de token
  // const response = await fetch('SUA_API_DE_LOGIN', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email: email.value, password: password.value })
  // });
  // const data = await response.json();
  // const token = data.token;

  // Salvar o token no state (Pinia) - será feito em um próximo passo

  // Redireciona para a página de dashboard
  router.push('/dashboard')
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>