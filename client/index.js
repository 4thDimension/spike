import { trigger } from 'redial';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, match } from 'react-router/es6';
import { Provider } from 'react-redux';
import configureStore from '../common/store/createStore';

const initialState = window.INITIAL_STATE || {};

const store = configureStore(initialState);
const { dispatch } = store;

const container = document.getElementById('root');
const render = () => {
  const { pathname, search, hash } = window.location;
  const location = `${pathname}${search}${hash}`;

  // We need to have a root route for HMR to work.
  const createRoutes = require('../common/rootRouter').default;

  const routes = createRoutes(store);

  // Pull child views using match. Adjust Router for vanilla webpack HMR,
  // in development using a new key every time there is an edit.
  match({ routes, location }, () => {
    // Render app with Redux and router context to container element.
    // We need to have a random in development because of `match`'s dependency on
    // `views.` Normally, we would want just one file from which we require `views` from.
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} key={Math.random()} />
      </Provider>,
      container
    );
  });

  return browserHistory.listen((location1) => {
    // Match views based on location object:
    match({ routes, location1 }, (error, redirectLocation, renderProps) => {
      if (error) console.log(error);
      // Get array of route handler components:
      const { components } = renderProps;

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch
      };

      // Don't fetch data for initial route, server has already done the work:
      if (window.INITIAL_STATE) {
        // Delete initial data so that subsequent data fetches can occur:
        delete window.INITIAL_STATE;
      } else {
        // Fetch mandatory data dependencies for 2nd route change onwards:
        trigger('fetch', components, locals);
      }

      // Fetch deferred, client-only data dependencies:
      trigger('defer', components, locals);
    });
  });
};

const unsubscribeHistory = render();

if (module.hot) {
  module.hot.accept('../common/rootRouter', () => {
    unsubscribeHistory();
    setTimeout(render);
  });
}
