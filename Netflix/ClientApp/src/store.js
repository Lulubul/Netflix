import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import { promiseMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const history = createBrowserHistory();
export const rootReducer = createRootReducer(history);

export const store = createStore(
    rootReducer, // root reducer with router state
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        promiseMiddleware
      ),
    ),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  // Note! Make sure this path matches your rootReducer import exactly
  // Does not play well with "NODE_PATH" aliasing.
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer);
  });
}