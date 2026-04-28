import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { DrupalUserResource } from '../types/user';
import { useDrupalSettingsStore } from '../stores/drupalSettingsStore';

interface DrupalJsonApiCollection<T> {
  data: T[];
}

// Cached CSRF token — fetched once per page load, reused for all mutations.
let resolvedCsrfToken: string | null = null;

async function getCsrfToken(): Promise<string> {
  if (resolvedCsrfToken) return resolvedCsrfToken;

  // Prefer the token Drupal injected at page load (zero extra HTTP round-trip).
  const store = useDrupalSettingsStore();
  if (store.csrfToken) {
    resolvedCsrfToken = store.csrfToken;
    return resolvedCsrfToken;
  }

  // Fallback: fetch from Drupal's built-in session/token endpoint.
  const response = await axios.get<string>('/session/token');
  resolvedCsrfToken = response.data;
  return resolvedCsrfToken;
}

function getApiClient() {
  const store = useDrupalSettingsStore();

  const client = axios.create({
    baseURL: store.apiBase,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  // Global CSRF interceptor: attach X-CSRF-Token to all state-mutating requests.
  // GET and HEAD are safe methods — Drupal does not require the token for them.
  client.interceptors.request.use(async (config) => {
    const method = (config.method ?? 'get').toLowerCase();
    if (['post', 'patch', 'delete'].includes(method)) {
      config.headers['X-CSRF-Token'] = await getCsrfToken();
    }
    return config;
  });

  return client;
}

export default {
  getArticles() {
    return getApiClient().get('/node/article');
  },
  getUsers(): Promise<AxiosResponse<DrupalJsonApiCollection<DrupalUserResource>>> {
    return getApiClient().get('/user/user');
  },
};
