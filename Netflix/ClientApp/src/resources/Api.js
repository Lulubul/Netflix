import axios from "axios";
const apiBase = 'api';

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

export const HistoryAsync = {
  get: (userId, profileId) => axios.get(`/history?userId=${userId}&profileId=${profileId}`).then(response => response.data),
  post: (historyItem) => axios.post(`/history`, historyItem)
}

export const RecommandationsAsync = {
  get: (userId, profileId) => axios.get(`/Recommendations?userId=${userId}&profileId=${profileId}`).then(response => response.data),
}

export const PlansAsync = {
  get: () => axios.get('/plans').then(response => response.data)
}

export const ProfilesAsync = {
  get: (userId) => axios.get(`/profiles?userId=${userId}`).then(response => response.data),
  post: (userId, newProfile) => axios.post(`/profiles?userId=${userId}`, newProfile),
}

export const MoviesAsync = {
  getGenres: () => axios.get('/genres').then(response => response.data),
  getMovies: () => axios.get('/movies').then(response => response.data),
  getTvShows: () => axios.get('/tvSeries').then(response => response.data),
  getMoviesByName: (movieName) => axios.get('/movies/search/' + movieName).then(response => response.data)
}