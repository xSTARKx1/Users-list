import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export function fetchUsers() {
  return axios.get(`/users`);
}

export function fetchUserAlbums(id) {
  return axios.get(`/albums?userId=${id}`);
}

export function fetchUserPosts(id) {
  return axios.get(`/posts?userId=${id}`);
}
