<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* Add a little basic spacing */
nav {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}
</style>