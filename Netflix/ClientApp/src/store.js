import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import { promiseMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory();
export const rootReducer = createRootReducer(history);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'] 
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        promiseMiddleware
      ),
    ),
);
export const persistor = persistStore(store);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  // Note! Make sure this path matches your rootReducer import exactly
  // Does not play well with "NODE_PATH" aliasing.
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer);
  });
}