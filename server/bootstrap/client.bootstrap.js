import { RouterContext, createMemoryHistory, match } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/server';
import ReactHelmet from 'react-helmet';
import { trigger } from 'redial';
import configureStore from '../../common/store/createStore';
import createRoutes from '../../common/rootRouter';

const renderHTML = (html, head, initialState) => {
  const assets = require('../../assets.json');

  return (
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8">
        <meta httpEquiv="X-UA-Compatible" content="IE=edge">
        ${head.title.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${head.meta.toString()}
        ${head.link.toString()}
        <link
          href="${assets.app.css}"
          media="screen, projection"
          rel="stylesheet" type="text/css" charSet="UTF-8" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(initialState)};
        </script>
        <script src="${assets.vendor.js}"></script>
        <script src="${assets.react.js}"></script>
        <script async src="${assets.app.js}"></script>
      </body>
    </html>`
  );
}
const renderClient = (req, res) => {
  const store = configureStore();
  const routes = createRoutes(store);
  const history = createMemoryHistory(req.originalUrl);
  const { dispatch } = store;
  match({ routes, history }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).send('Not found');
    }

    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks don't confuse with react hooks
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    };

    trigger('fetch', components, locals)
      .then(() => {
        const initialState = store.getState();
        const InitialView = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const html = ReactDOM.renderToString(InitialView);
        const head = ReactHelmet.rewind();
        return res.status(200).send(renderHTML(html, head, initialState));
      }).catch(e => console.log(e));
  });
};

export default renderClient;
