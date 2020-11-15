import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { store, history, persistor} from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes, faAngleRight, faAngleLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { PersistGate } from 'redux-persist/integration/react';

library.add(faCheck, faTimes, faAngleRight, faAngleLeft, faPlusCircle )

const rootElement = document.getElementById('root');
registerServiceWorker();
ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <ConnectedRouter history={history}> 
        <App/>
      </ConnectedRouter>
    </Provider>
  </PersistGate>,
  rootElement);


if (module.hot) {
  module.hot.accept();
}


