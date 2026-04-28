import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import DrupalService from '../services/DrupalService';

export const useArticleStore = defineStore('articles', () => {
  // --- State ---
  const articles = ref([]);
  
  // Scalable status tracking for any article-related sub-resources
  const status = reactive({
    list: { loading: false, error: null as string | null },
    featured: { loading: false, error: null as string | null }
  });

  // --- Actions ---
  
  /**
   * Main fetcher for articles
   */
  async function fetchArticles() {
    // Prevent re-fetching if data exists (optional optimization)
    status.list.loading = true;
    status.list.error = null;

    try {
      const response = await DrupalService.getArticles();
      articles.value = response.data.data;
    } catch (err) {
      status.list.error = 'Unable to load news articles from the intranet.';
      console.error('Article Fetch Error:', err);
    } finally {
      status.list.loading = false;
    }
  }

  /**
   * Logic to clear or refresh articles
   */
  function clearArticles() {
    articles.value = [];
  }

  return {
    articles,
    status,
    fetchArticles,
    clearArticles
  };
});