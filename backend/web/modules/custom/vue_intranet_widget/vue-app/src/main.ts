import axios from 'axios';
import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import './tailwind.css';
import UserSearch from './components/UserSearch.vue';
import UserDirectory from './components/UserDirectory.vue';
import ProfilePage from './pages/ProfilePage.vue';
import DirectoryPage from './pages/DirectoryPage.vue';
import { useDrupalSettingsStore } from './stores/drupalSettingsStore';

const pinia = createPinia();
setActivePinia(pinia);

// Parse window.drupalSettings into Pinia BEFORE any app mounts.
// This is the single source of truth for all Drupal-injected state.
const drupalStore = useDrupalSettingsStore();
drupalStore.init(window.drupalSettings?.vue_intranet_widget);

// Set CSRF token globally on axios defaults — every POST/PATCH/DELETE
// call anywhere in the app will carry this header automatically.
if (drupalStore.csrfToken) {
  axios.defaults.headers.common['X-CSRF-Token'] = drupalStore.csrfToken;
} else {
  // Fallback: if PHP didn't inject the token, fetch it lazily on the
  // first mutating request and cache it in defaults for all future calls.
  axios.interceptors.request.use(async (config) => {
    const method = (config.method ?? 'get').toLowerCase();
    if (
      ['post', 'patch', 'delete'].includes(method) &&
      !axios.defaults.headers.common['X-CSRF-Token']
    ) {
      const { data } = await axios.get<string>('/session/token');
      axios.defaults.headers.common['X-CSRF-Token'] = data;
      config.headers['X-CSRF-Token'] = data;
    }
    return config;
  });
}

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
