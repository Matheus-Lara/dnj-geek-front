<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="container text-secondary">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>
