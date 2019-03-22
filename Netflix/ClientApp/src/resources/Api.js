import axios from "axios";
const apiBase = '/api';

axios.defaults.baseURL = apiBase;

export const Auth = {
  login: (email, password) =>
    axios.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    axios.post('/users/register', { user: { username, email, password } }),
  save: user =>
    axios.put('/user', { user })
};

export const Plans = {
  get: () => axios.get('/plans').then(response => response.data)
}

export const getPlans = () => {
  return fetch(`${apiBase}/plans`, {cache: "force-cache"})
    .then(response => response.json());
}

export const getProfiles = (userId) => {
  return fetch(`${apiBase}/profiles?usedId=${userId}`, {cache: "force-cache"})
    .then(response => response.json());
}

export const postProfile = (userId, newProfile) => {
  return fetch(`${apiBase}/profiles?usedId=${userId}`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(newProfile)
  })
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