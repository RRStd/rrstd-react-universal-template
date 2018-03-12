const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('../../project.config');


const inProject = path.resolve.bind(path, project.basePath);
const inProjectSrc = file => inProject(project.srcDir, file);


function configureStyle(config, opts) {
  const extractStyles = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
    disable: opts.__DEV__, // eslint-disable-line no-underscore-dangle
  });

  config.module.rules.push({
    test: /\.(styl)$/,
    loader: extractStyles.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          sourceMap: project.sourcemaps,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: [ 'last 2 versions' ],
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
        }}, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins(/* loader */) {
              return [
                require('postcss-rtl')(), // eslint-disable-line global-require
              ];
            },
            sourceMap: project.sourcemaps,
          },
        }, {
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
}


module.exports = configureStyle;
