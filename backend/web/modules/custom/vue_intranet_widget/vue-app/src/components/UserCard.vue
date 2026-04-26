<template>
  <li class="user-card">
    <div class="user-info">
      <span class="user-name">{{ name }}</span>
      <span class="user-role">{{ role }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
// We define exactly what data a card needs to render
defineProps<{
  name: string;
  role: string;
}>();
</script>

<style scoped>
.user-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  list-style: none;
}
.user-name {
  display: block;
  font-weight: bold;
  color: #111827;
}
.user-role {
  font-size: 0.85rem;
  color: #6b7280;
}
</style>