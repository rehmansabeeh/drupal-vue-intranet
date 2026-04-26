<template>
  <div v-if="article">
    <h1>{{ article.attributes.title }}</h1>
    <div v-html="article.attributes.body.value"></div>
    <br>
    <router-link to="/">Back to Home</router-link>
  </div>
  <p v-else>Loading article...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DrupalService from '../services/DrupalService';

const route = useRoute();
const article = ref(null);

onMounted(async () => {
  try {
    const response = await DrupalService.getArticle(route.params.id);
    article.value = response.data.data;
  } catch (error) {
    console.error('Error fetching the article:', error);
  }
});
</script>