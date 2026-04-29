import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { DrupalUserResource } from '../types/user';
import { useDrupalSettingsStore } from '../stores/drupalSettingsStore';

interface DrupalJsonApiCollection<T> {
  data: T[];
}

const store = useDrupalSettingsStore();

// Single shared client. X-CSRF-Token is inherited from axios.defaults,
// which main.ts sets globally before any app mounts.
const apiClient = axios.create({
  baseURL: store.apiBase,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

export default {
  getUsers(): Promise<AxiosResponse<DrupalJsonApiCollection<DrupalUserResource>>> {
    return apiClient.get('/user/user');
  },
};
