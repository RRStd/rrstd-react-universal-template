const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('../project.config');

const inProject = path.resolve.bind(path, project.basePath);
const inProjectSrc = file => inProject(project.srcDir, file);


const config = {
  target: 'node',

  entry: {
    server: [
      'babel-polyfill',
      inProjectSrc(project.server),
    ],
  },
  devtool: project.sourcemaps ? 'source-map' : false,
  output: {
    path: inProject(project.outDir),
    filename: '../[name].js',
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
    // new webpack.DefinePlugin(Object.assign({
    //   // 'process.env': { NODE_ENV: JSON.stringify(project.env) },
    //   // __DEV__,
    //   // __TEST__,
    //   // __PROD__,
    //   // __BROWSER__: false,
    //   window: undefined,
    // }, project.globals))
  ],
};

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-react-pug',
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [ 'babel-plugin-transform-runtime', {
          helpers: true,
          polyfill: false, // we polyfill needed features in src/normalize.js
          regenerator: true,
        }],
        [ 'babel-plugin-transform-object-rest-spread', {
          useBuiltIns: true, // we polyfill Object.assign in src/normalize.js
        }],
      ],
      presets: [
        'babel-preset-react',
        [ 'babel-preset-env', {
          targets: { node: 6 },
        }],
      ],
    },
  }],
});

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  // disable: __DEV__,
  disable: true,
});

config.module.rules.push({
  test: /\.(styl)$/,
  // use: 'null-loader',
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: project.sourcemaps,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll : true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: project.sourcemaps,
          },
        },
      },
      {
        loader: 'stylus-loader',
        options: {
          paths: 'styles',
          sourceMap: project.sourcemaps,
          includePaths: [
            inProjectSrc('styles'),
          ],
        },
      },
    ],
  }),
});
config.plugins.push(extractStyles);

// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|gif|svg)$/,
  loader  : 'url-loader',
  options : {
    limit : 32,
  },
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  // ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0];
  const mimetype = font[1];

  config.module.rules.push({
    test    : new RegExp(`\\.${ extension }$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 32,
      mimetype,
    },
  });
});


module.exports = config;
