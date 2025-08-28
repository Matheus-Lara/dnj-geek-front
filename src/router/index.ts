import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore, type User } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: (to) => ({ path: '/home', query: to.query })
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const hasVisited = localStorage.getItem('hasVisited')
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (!hasVisited && to.name !== 'register') {
    localStorage.setItem('hasVisited', 'true')
    return next({ name: 'register', query: to.query })
  }

  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return next({ name: 'home', query: to.query })
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login', query: to.query })
  }

  next()
})

export default router
