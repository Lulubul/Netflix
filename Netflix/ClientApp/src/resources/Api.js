

const apiBase = '/api';

export const getProfiles = (userId) => {
    return fetch(`${apiBase}/Profiles?usedId=${userId}`)
      .then(response => response.json());
}
