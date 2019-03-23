import {
    LOGIN,
    REGISTER,
    LOGIN_PAGE_UNLOADED,
    REGISTER_FLOW_UNLOADED,
    UPDATE_FIELD_AUTH,
    UPDATE_PLAN,
    PLANFORM_PAGE_LOADED,
    PAYMENT_PAGE_LOADED
} from '../constants/actionTypes';
  
export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case UPDATE_PLAN: 
      return { ...state, selectedPlan: action.value }
    case PLANFORM_PAGE_LOADED:
    case PAYMENT_PAGE_LOADED:
      return { ...state, plans: action.payload };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_FLOW_UNLOADED:
      return {};
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};