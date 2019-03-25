import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './reducers/auth';
import common from './reducers/common';
import profile from './reducers/profile';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  profile,
  common
});