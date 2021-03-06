import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReduxProvider } from 'reactive-react-redux';
import history from 'router/history';
import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import store from './redux/store';

ReactDOM.render(
  <ReduxProvider store={store}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ReduxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
