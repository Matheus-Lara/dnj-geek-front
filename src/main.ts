import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vPhoneMask } from './directives/phoneMask'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.directive('phone-mask', vPhoneMask)
app.use(router)

app.mount('#app')
