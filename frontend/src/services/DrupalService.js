import axios from 'axios';

const apiClient = axios.create({
  // This is your DDEV Drupal URL + the JSON:API endpoint
  baseURL: 'https://backend.ddev.site/jsonapi',
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
});

export default {
  getArticles() {
    return apiClient.get('/node/article');
  },
  getArticle(id) {
    return apiClient.get(`/node/article/${id}`);
  }
};