import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { store, history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faAngleRight, faAngleLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faTimes, faAngleRight, faAngleLeft, faPlusCircle)

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> 
      <App/>
    </ConnectedRouter>
  </Provider>,
  rootElement);

registerServiceWorker();
