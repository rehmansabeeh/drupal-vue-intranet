import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    searchQuery: '',
  }),
  actions: {
    setSearch(query: string) {
      this.searchQuery = query;
    },
  },
});