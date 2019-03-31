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
        return {
            ...state,
            redirectTo: action.error ? null : '/profiles',
            userId: action.error ? null : "3f008259-8509-40a2-8118-f047861e4f31"
        };
        case REGISTER:
        return {
            ...state,
            redirectTo: action.error ? null : '/profiles',
            userId: action.error ? null : action.payload.data
        };
        default:
        return state;
    }
}