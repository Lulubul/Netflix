import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './reducers/auth';
import common from './reducers/common';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  common
});