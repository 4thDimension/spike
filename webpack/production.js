var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: [
      'font-awesome-loader',
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
    path: path.join(__dirname, 'web'),
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    publicPath: '/dist/'
  },
  plugins: [
    new AssetsPlugin({ filename: 'assets.json' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin({
      filename: "[name].css"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'vendor'],
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx'],
    alias: {
      styles: 'styles',
      components: 'src/components'
    }
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [
      // don't remove exclude, there is some issue with babel 6
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.scss$/,
        include: [/globalStyles/],
        exclude: [/javascript/],
        loader: ExtractTextPlugin.extract(
          'style',
          'css?sourceMap!postcss!sass?sourceMap'
        )
      },
      {
        test: /\.scss$/,
        exclude: [/globalStyles/],
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass'
        )
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
