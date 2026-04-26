<script setup lang="ts">
import { useUserStore } from '../stores/userStore';
const store = useUserStore();
</script>

<template>
  <input 
    v-model="store.searchQuery" 
    type="text" 
    placeholder="Search colleagues..." 
  />
</template>