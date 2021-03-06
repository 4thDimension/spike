var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var AssetsPlugin = require('assets-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
module.exports = {
  devtool: '#source-map',
  entry: {
    app: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      'font-awesome-loader',
      'bootstrap-loader',
      './client/index'
    ],
    vendor: [
      'whatwg-fetch'
    ],
    react: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'redux-actions',
      'redux-promise-middleware',
      'reselect',
      'type-to-reducer'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    pathinfo: true,
    filename: '[name]_[hash].js',
    chunkFilename: '[name]_[hash].js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'vendor'],
      minChunks: Infinity
    }),
    new AssetsPlugin({ filename: 'assets.json' }),
    new DashboardPlugin()
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass'
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }
    ]
  },
  postcss: [autoprefixer],
  eslint: {
    fix: true
  }
};
