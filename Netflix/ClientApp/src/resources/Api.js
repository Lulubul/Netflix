

const apiBase = '/api';

export const getProfiles = (userId) => {
    return fetch(`${apiBase}/Profiles?usedId=${userId}`, {cache: "force-cache"})
      .then(response => response.json());
}

export const getGenres = () => {
  return fetch(`${apiBase}/Genres`, {cache: "force-cache"})
    .then(response => response.json());
}
