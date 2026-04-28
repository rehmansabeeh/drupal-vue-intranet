import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './tailwind.css';
import UserSearch from './components/UserSearch.vue';
import UserDirectory from './components/UserDirectory.vue';
import ProfilePage from './pages/ProfilePage.vue';
import DirectoryPage from './pages/DirectoryPage.vue';

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

// 3. Logic for the Profile Page
const profileEl = document.getElementById('vue-profile-mount');
if (profileEl) {
  const app = createApp(ProfilePage);
  app.use(pinia);
  app.mount(profileEl);
}

// 4. Logic for the Directory Page
const directoryPageEl = document.getElementById('vue-directory-page-mount');
if (directoryPageEl) {
  const app = createApp(DirectoryPage);
  app.use(pinia);
  app.mount(directoryPageEl);
}