<template>
  <div id="vue-app-wrapper">
    <UserDirectory />
  </div>
</template>

<script setup lang="ts">
import UserDirectory from './components/UserDirectory.vue';
</script>

<style>
/* Global styles for the Vue island can go here */
#vue-app-wrapper {
  font-family: Arial, sans-serif;
  margin: 1rem 0;
}
</style>