<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>
