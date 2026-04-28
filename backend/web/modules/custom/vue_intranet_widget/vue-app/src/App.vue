<template>
  <div
    id="vue-app-wrapper"
    class="min-h-screen bg-slate-50 text-slate-900"
  >
    <div class="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <UserDirectory />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserDirectory from './components/UserDirectory.vue';
</script>