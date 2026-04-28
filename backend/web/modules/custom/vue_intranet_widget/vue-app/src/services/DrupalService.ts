import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { DrupalUserResource } from '../types/user';

const apiBase = (window as Window & {
  drupalSettings?: {
    vue_intranet_widget?: {
      api_base?: string;
    };
  };
}).drupalSettings?.vue_intranet_widget?.api_base || '/jsonapi';

const apiClient = axios.create({
  baseURL: apiBase,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

interface DrupalJsonApiCollection<T> {
  data: T[];
}

export default {
  getArticles() {
    return apiClient.get('/node/article');
  },
  getUsers(): Promise<AxiosResponse<DrupalJsonApiCollection<DrupalUserResource>>> {
    return apiClient.get('/user/user');
  }
};