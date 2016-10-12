import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import glob from 'glob';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import path from 'path';
import serveStatic from 'serve-static';
import graphql from '../graphql';
import renderClient from './client.bootstrap';

const prodServer = () => {
  const server = express();
  server.use(morgan('combined'));
  server.use(helmet());
  server.use(hpp());
  server.use(compression());

  return server;
};

const devServer = () => {
  const server = express();
  server.use(morgan('dev'));
  const config = require('../../webpack/dev');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const DashboardPlugin = require('webpack-dashboard/plugin');

  const compiler = webpack(config);
  compiler.apply(new DashboardPlugin());
  compiler.plugin('done', () => {
    const assetsJsonPath = path.resolve(__dirname, '../..', 'assets.json');
    delete require.cache[assetsJsonPath];
  });
  server.use(webpackDevMiddleware(compiler, { publicPath: '/dist/', quiet: true }));
  server.use(webpackHotMiddleware(compiler, { log: console.log }));

  return server;
};

const createServer = (isProdOrTest) => {
  const server = isProdOrTest ? prodServer() : devServer();

  server.disable('x-powered-by');
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(serveStatic(path.join(__dirname, '../..', 'assets')));
  const apis = glob.sync('**/*.controller.js', { cwd: path.join(__dirname, '..', 'api') });
  apis.forEach((apiPath) => {
    const api = require(`../api/${apiPath}`).default;
    server.use(`/api/${api.rootUrl}`, api.router);
  });

  server.use('/graphql', graphql);
  server.use('*', renderClient);

  return server;
};

export default createServer;
