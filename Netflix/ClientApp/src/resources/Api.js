const apiBase = '/api';

export const getProfiles = (userId) => {
  return fetch(`${apiBase}/profiles?usedId=${userId}`, {cache: "force-cache"})
    .then(response => response.json());
}

export const postProfile = (userId, newProfile) => {
  return fetch(`${apiBase}/profiles?usedId=${userId}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProfile)
  })
}

export const getGenres = () => {
  return fetch(`${apiBase}/genres`, {cache: "force-cache"})
    .then(response => response.json());
}

export const getPlans = () => {
  return fetch(`${apiBase}/plans`)
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