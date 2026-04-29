import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { DrupalUserResource } from '../types/user';
import { useDrupalSettingsStore } from '../stores/drupalSettingsStore';

interface DrupalJsonApiCollection<T> {
  data: T[];
}

// Lazily created on first use — defers store access until after
// setActivePinia() has run in main.ts.
let _client: AxiosInstance | null = null;

function client(): AxiosInstance {
  if (!_client) {
    const store = useDrupalSettingsStore();
    _client = axios.create({
      baseURL: store.apiBase,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });
  }
  return _client;
}

export default {
  getUsers(): Promise<AxiosResponse<DrupalJsonApiCollection<DrupalUserResource>>> {
    return client().get('/user/user');
  },
  getArticles() {
    return client().get('/node/article');
  },
};
