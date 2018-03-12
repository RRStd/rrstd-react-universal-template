const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cfgUrlLoader = require('./webpack/ldr-url');
const cfgBabelLoader = require('./webpack/ldr-babel');
const configureStyle = require('./webpack/cfg-style');

const project = require('../project.config');

const inProject = path.resolve.bind(path, project.basePath);
const inProjectSrc = file => inProject(project.srcDir, file);

/* eslint-disable no-underscore-dangle */
const __DEV__ = project.env === 'development';
const __TEST__ = project.env === 'test';
const __PROD__ = project.env === 'production';
/* eslint-enable no-underscore-dangle */

const config = {
  entry: {
    main: [
      'babel-polyfill',
      inProjectSrc(project.main),
    ],
  },
  devtool: project.sourcemaps ? 'source-map' : false,
  output: {
    path: inProject(project.outDir),
    // filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
    filename: '[name].js',
    publicPath: project.publicPath,
  },
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json', '.styl'],
  },
  externals: project.externals,
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        NODE_ENV: JSON.stringify(project.env),
      },
      __DEV__,
      __TEST__,
      __PROD__,
      __BROWSER__: true,
    }, project.globals)),
  ],
};

config.module.rules.push(cfgBabelLoader());

configureStyle(config, {
  __DEV__,
  includePaths: [ inProjectSrc('styles') ],
});

// config.module.rules.push(...cfgUrlLoader());
// console.log(Array.prototype.)
Array.prototype.push.apply(config.module.rules, cfgUrlLoader());

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    collapseWhitespace: true,
  },
}));

// Development Tools
// ------------------------------------
if( __DEV__ ) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=${ config.output.publicPath }__webpack_hmr`,
  );
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  );
}

// Bundle Splitting
// ------------------------------------
if( !__TEST__ ) {
  const bundles = [ 'manifest' ];

  if(project.vendors && project.vendors.length) {
    bundles.unshift('vendor');
    config.entry.vendor = project.vendors;
  }
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }));
}

// Production Optimizations
// ------------------------------------
if( __PROD__ ) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    }),
  );
}


module.exports = config;
