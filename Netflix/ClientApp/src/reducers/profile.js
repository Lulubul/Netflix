import {
    PROFILES_PAGE_LOADED,
    ADD_NEW_PROFILE,
    UPDATE_PROFILE_FIELD,
    SELECT_PROFILE
} from '../constants/actionTypes';
  
export default (state = {}, action) => {
  switch (action.type) {
    case PROFILES_PAGE_LOADED:
      return { ...state, profiles: action.payload };
    case ADD_NEW_PROFILE:
      return { ...state, profiles: [ ...(state.profiles || []), action.payload] };
    case UPDATE_PROFILE_FIELD:
      return { ...state, [action.key]: action.value };
    case SELECT_PROFILE:
      return { 
        ...state,
        selectedProfile: state.profiles.find((profile) => profile.id == action.value)
      }
    default:
      return state;
  }
};
