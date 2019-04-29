import { 
    REDIRECT,
    LOGOUT, 
    LOGIN, 
    REGISTER,
    ADD_NEW_PROFILE,
    SELECT_PROFILE, 
    SEARCH_MOVIE,
    CLEAR_SEARCH_INPUT,
    ACCOUNT_PAGE_LOADED 
} from '../constants/actionTypes';

const defaultState = {
    appName: 'Streaming Website',
    token: null,
    viewChangeCounter: 0,
    userId: null,
    selectedPlan: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REDIRECT:
            return { ...state, redirectTo: null };
        case SEARCH_MOVIE:
            return { ...state, redirectTo: '/watchItemsFounded' };
        case CLEAR_SEARCH_INPUT:
            return { ...state, redirectTo: '/movies' };
        case LOGOUT:
            return { redirectTo: '/', token: null, userId: null, user: null };
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/profiles',
                userId: action.error ? null : action.payload.data.id,
                user: action.error ? null : action.payload.data
            };
        case ADD_NEW_PROFILE:
            return {
                ...state,
                redirectTo: action.error ? null : '/profiles',
            }
        case SELECT_PROFILE:
            return {
                ...state,
                redirectTo: action.error ? null : '/movies',
            }
        case ACCOUNT_PAGE_LOADED:
            return {
                ...state,
                selectedPlan: action.error ? null : action.payload.find(x => x.id === state.user.planId)
            }
        default:
            return state;
    }
}