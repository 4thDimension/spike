import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';
import ReactHelmet from 'react-helmet';
import configureStore from '../common/store/createStore';
import createRoutes from '../common/rootRouter';


const __PROD__ = process.env.NODE_ENV === 'production';
const __TEST__ = process.env.NODE_ENV === 'test';
const port = process.env.PORT || 8080;
const server = express();
let assets;
server.disable('x-powered-by');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

if (__PROD__ || __TEST__) {
  server.use(morgan('combined'));
  server.use(helmet());
  server.use(hpp());
  server.use(compression());
  assets = require('../assets.json');
} else {
  server.use(morgan('dev'));
  const config = require('../webpack/dev');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const DashboardPlugin = require('webpack-dashboard/plugin');

  const compiler = webpack(config);
  compiler.apply(new DashboardPlugin());
  server.use(webpackDevMiddleware(compiler, { quiet: true }));
  server.use(webpackHotMiddleware(compiler, { log: console.log }));
}
server.use(express.static('public'));

server.get('*', (req, res) => {
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
        res.status(200).send(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charSet="utf-8">
              <meta httpEquiv="X-UA-Compatible" content="IE=edge">
              ${head.title.toString()}
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="shortcut icon" href="/favicon.ico">
              ${head.meta.toString()}
              ${head.link.toString()}
            </head>
            <body>
              <div id="root">${html}</div>
              <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
              <script src="${ __PROD__ ? assets.vendor.js : '/vendor.js' }"></script>
              <script async src="${ __PROD__ ? assets.main.js : '/main.js' }" ></script>
            </body>
          </html>
        `);
      }).catch(e => console.log(e));
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Running application on ${port}`);
});

module.exports = server;
