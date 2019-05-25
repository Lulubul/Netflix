import {
  ASYNC_START,
  ASYNC_END,
  LOGOUT, 
  LOGIN, 
  REGISTER
} from './constants/actionTypes';
import { setAuthHeader } from './resources/Api';

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
      store.dispatch({ type: ASYNC_START, subtype: action.type });
  
      const currentView = store.getState().viewChangeCounter;
      const skipTracking = action.skipTracking;
  
      action.payload.then(
        res => {
          const currentState = store.getState();
          if (!skipTracking && currentState.viewChangeCounter !== currentView) {
            return
          }
          console.log('RESULT', res);
          action.payload = res;
          store.dispatch({ type: ASYNC_END, promise: action.payload });
          store.dispatch(action);
        },
        error => {
          const currentState = store.getState();
          if (!skipTracking && currentState.viewChangeCounter !== currentView) {
            return
          }
          console.log('ERROR', error);
          action.error = true;
          action.payload = error.response.body;
          if (!action.skipTracking) {
            store.dispatch({ type: ASYNC_END, promise: action.payload });
          }
          store.dispatch(action);
        }
      );
  
      return;
    }
  
    next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.data.token);
      setAuthHeader(action.payload.data.token);
      
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    setAuthHeader('');
  }

  next(action);
};


const isPromise = (v) => {
    return v && typeof v.then === 'function';
}

export { promiseMiddleware, localStorageMiddleware }