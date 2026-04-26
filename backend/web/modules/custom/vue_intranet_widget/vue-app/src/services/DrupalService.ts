import axios from 'axios';

declare global {
  interface Window {
    drupalSettings: any;
  }
}

const apiBase = window.drupalSettings?.vue_intranet_widget?.api_base || '/jsonapi';


const apiClient = axios.create({
  baseURL: apiBase,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
});

export default {
  getArticles() {
    return apiClient.get('/node/article');
  },
  getUsers(): Promise<any> {
    return apiClient.get('/user/user');
  }
};