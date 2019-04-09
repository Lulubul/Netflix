import axios from "axios";
const apiBase = '/api';

axios.defaults.baseURL = apiBase;

export const AuthAsync = {
  login: (email, password) =>
    axios.post('/users/login', { email, password  }),
  logout: () =>
    axios.post('/users/logout'),
  register: (user) =>
    axios.post('/users/register', user),
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

export const MoviesAsync = {
  getGenres: () => axios.get('/genres').then(response => response.data),
  getMovies: () => axios.get('/movies').then(response => response.data),
  getTvShows: () => axios.get('/movies').then(response => response.data),
  getMovieByName: (movieName) => axios.get('/movies/' + movieName).then(response => response.data)
}