import { REDIRECT, LOGOUT, LOGIN, REGISTER, ADD_NEW_PROFILE, SELECT_PROFILE } from '../constants/actionTypes';

const defaultState = {
    appName: 'Streaming Website',
    token: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', token: null, userId: null };
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/profiles',
                userId: action.error ? null : action.payload.data.id
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
        default:
            return state;
    }
}