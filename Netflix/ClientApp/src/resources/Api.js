

const apiBase = '/api';

export const getProfiles = (userId) => {
    return fetch(`${apiBase}/profiles?usedId=${userId}`, {cache: "force-cache"})
      .then(response => response.json());
}

export const getGenres = () => {
  return fetch(`${apiBase}/genres`, {cache: "force-cache"})
    .then(response => response.json());
}

export const getPlans = () => {
  return fetch(`${apiBase}/plans`)
    .then(response => response.json());
}
