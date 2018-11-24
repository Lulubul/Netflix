

const apiBase = 'https://localhost:44334/api';

export const getProfiles = (userId) => {
    return fetch(`${apiBase}/Profiles?usedId=${userId}`)
      .then(response => response.json());
}