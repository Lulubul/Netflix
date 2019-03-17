import { REDIRECT } from '../constants/actionTypes';

export default (state = defaultState, action) => {
    switch (action.type) {
        case REDIRECT:
            return { ...state, redirectTo: null };
    }
}