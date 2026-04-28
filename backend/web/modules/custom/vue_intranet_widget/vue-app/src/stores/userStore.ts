import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import DrupalService from '../services/DrupalService';
import type { DrupalUserResource } from '../types/user';

export const useUserStore = defineStore('user', () => {
  // --- State ---
  const searchQuery = ref('');
  const users = ref<DrupalUserResource[]>([]);
  
  /**
   * Scalable status tracking for user-related resources.
   * This allows the Directory and Search to have independent error/loading states.
   */
  const status = reactive({
    directory: { loading: false, error: null as string | null },
  });

  // --- Actions ---

  /**
   * Fetches the colleague list from Drupal JSON:API.
   */
  async function fetchUsers() {
    // Optimization: Don't re-fetch if we already have the directory loaded
    if (users.value.length > 0) return;

    status.directory.loading = true;
    status.directory.error = null;
    
    try {
      const response = await DrupalService.getUsers();
      // Filter out invalid users immediately at the source
      users.value = response.data.data.filter((u: DrupalUserResource) => u.attributes.name !== null);
    } catch (err) {
      status.directory.error = 'Failed to load colleagues from the corporate directory.';
      console.error('User Fetch Error:', err);
    } finally {
      status.directory.loading = false;
    }
  }

  /**
   * Global search state updater used by the Header Search block
   */
  function setSearch(query: string) {
    searchQuery.value = query;
  }

  return { 
    searchQuery, 
    users, 
    status,
    fetchUsers, 
    setSearch,
  };
});