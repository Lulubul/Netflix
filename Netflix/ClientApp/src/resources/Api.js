import axios from "axios";
const apiBase = '/api';

axios.defaults.baseURL = apiBase;

export const AuthAsync = {
  login: (email, password) =>
    axios.post('/users/login', { email, password  }),
  register: (email, password, planId) =>
    axios.post('/users/register', { email, password, planId  }),
  save: user =>
    axios.put('/user', { user })
};

export const PlansAsync = {
  get: () => axios.get('/plans').then(response => response.data)
}

export const ProfilesAsync = {
  get: (userId) => axios.get(`/profiles?usedId=${userId}`).then(response => response.data),
  post: (userId, newProfile) => axios.post(`/profiles?usedId=${userId}`, newProfile),
}

export const getGenres = () => {
  return fetch(`${apiBase}/genres`, {cache: "force-cache"})
    .then(response => response.json());
}

export const getMovies = () => {
  return fetch(`${apiBase}/movies`)
    .then(response => response.json());
}

export const getTvShows = () => {
  return fetch(`${apiBase}/movies`)
    .then(response => response.json());
}