import {
    SEARCH_MOVIE,
    MOVIES_PAGE_LOADED,
    TVSHOWS_PAGE_LOADED
} from '../constants/actionTypes';
  
export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return { ...state  };
    case MOVIES_PAGE_LOADED:
    case TVSHOWS_PAGE_LOADED:
      return { ...state, genres: action.payload.genres, movies: action.payload.movies };
    default:
      return state;
  }
};
