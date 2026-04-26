import { createApp } from 'vue';
import { createPinia } from 'pinia';
import UserSearch from './components/UserSearch.vue';
import UserDirectory from './components/UserDirectory.vue';

const pinia = createPinia();

// 1. Logic for the Search Block
const searchEl = document.getElementById('vue-search-mount');
if (searchEl) {
  const app = createApp(UserSearch);
  app.use(pinia);
  app.mount(searchEl);
}

// 2. Logic for the Directory Block
const directoryEl = document.getElementById('vue-directory-mount');
if (directoryEl) {
  const app = createApp(UserDirectory);
  app.use(pinia);
  app.mount(directoryEl);
}