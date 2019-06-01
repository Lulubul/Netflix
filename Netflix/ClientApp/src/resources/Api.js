import axios from "axios";
export const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
 }

export const ConfigsAsync = {
  get: () => axios.get(`api/configs`).then((response) => {
    axios.defaults.historyUrl = response.data.historyUrl;
    axios.defaults.moviesUrl = response.data.moviesUrl;
    axios.defaults.newsUrl = response.data.newsUrl;
    axios.defaults.profilesUrl = response.data.profilesUrl;
    axios.defaults.recommendationsUrl = response.data.recommendationsUrl;
    axios.defaults.tvSeriesUrl = response.data.tvSeriesUrl;
    axios.defaults.usersUrl = response.data.usersUrl;
  }),
};

export const AuthAsync = {
  login: (email, password) => axios.post(`${axios.defaults.usersUrl}/users/login`, { email, password }),
  logout: () => axios.post(`${axios.defaults.usersUrl}/users/logout`),
  register: (user) => axios.post(`${axios.defaults.usersUrl}/users/register`, user),
  save: (user) => axios.put(`${axios.defaults.usersUrl}/user`, { user })
};

export const HistoryAsync = {
  get: (userId, profileId) => axios.get(`${axios.defaults.historyUrl}/history?userId=${userId}&profileId=${profileId}`).then(response => response.data),
  post: (historyItem) => axios.post(`${axios.defaults.historyUrl}/history`, historyItem)
};

export const RecommandationsAsync = {
  get: (userId, profileId) => axios.get(`${axios.defaults.recommendationsUrl}/Recommendations?userId=${userId}&profileId=${profileId}`).then(response => response.data)
};

export const PlansAsync = {
  get: () => axios.get(`${axios.defaults.usersUrl}/plans`).then(response => (response.data))
};

export const ProfilesAsync = {
  get: (userId) => axios.get(`${axios.defaults.profilesUrl}/profiles?userId=${userId}`).then(response => response.data),
  post: (userId, newProfile) => axios.post(`${axios.defaults.profilesUrl}/profiles?userId=${userId}`, newProfile)
};

export const MoviesAsync = {
  getGenres: () => axios.get(`${axios.defaults.moviesUrl}/genres`).then(response => response.data),
  getMovies: () => axios.get(`${axios.defaults.moviesUrl}/movies`).then(response => response.data),
  getTvShows: () => axios.get(`${axios.defaults.moviesUrl}/tvSeries`).then(response => response.data),
  getMoviesByName: (movieName) => axios.get(`${axios.defaults.moviesUrl}/movies/search/${movieName}`).then(response => response.data)
};