import { REDIRECT, LOGOUT, LOGIN, REGISTER } from '../constants/actionTypes';

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
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case LOGIN:
        case REGISTER:
        return {
            ...state,
            redirectTo: action.error ? null : '/',
            token: action.error ? null : action.payload.user.token,
            currentUser: action.error ? null : action.payload.user
        };
        default:
        return state;
    }
}