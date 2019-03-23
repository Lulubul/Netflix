import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import { promiseMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const history = createBrowserHistory();
export const store = createStore(
    createRootReducer(history), // root reducer with router state
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        promiseMiddleware
      ),
    ),
);