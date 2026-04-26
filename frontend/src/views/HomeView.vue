<template>
  <main>
    <h1>Drupal 10 + Vue 3 (via DDEV)</h1>
    <ul v-if="articles.length">
      <li v-for="article in articles" :key="article.id">
        <router-link :to="`/article/${article.id}`">
          {{ article.attributes.title }}
        </router-link>
      </li>
    </ul>
    <p v-else>No articles found or loading...</p>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DrupalService from '../services/DrupalService';

const articles = ref([]);

onMounted(async () => {
  try {
    const response = await DrupalService.getArticles();
    articles.value = response.data.data; 
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
});
</script>