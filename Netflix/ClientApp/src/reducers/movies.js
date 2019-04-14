import {
    SEARCH_MOVIE,
    MOVIES_PAGE_LOADED,
    TVSHOWS_PAGE_LOADED,
    UPDATE_SEARCH_INPUT,
    CLEAR_SEARCH_INPUT
} from '../constants/actionTypes';
  
export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return { ...state, watchItems: action.payload };
    case MOVIES_PAGE_LOADED:
    case TVSHOWS_PAGE_LOADED:
      return { ...state, genres: action.payload && action.payload.genres, movies: action.payload && action.payload.movies };
    case UPDATE_SEARCH_INPUT:
      return { ...state, searchInput: action.value }
    case CLEAR_SEARCH_INPUT:
    return { ...state, searchInput: '' }
    default:
      return state;
  }
};
