const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');
const { presets, plugins } = require(`${appDirectory}/babel.config.js`);

const fromRoot = _ => path.resolve(appDirectory, _);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  'react-native',
  '@ptomasroos/react-native-multi-slider',
  '@react-navigation/drawer',
].map(moduleName => fromRoot(`node_modules/${moduleName}`));

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(tsx|jsx|ts|js)?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    fromRoot('index.web.js'),
    fromRoot('App.tsx'),
    fromRoot('src'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets,
      // Re-write paths to import only the modules needed by the app
      plugins,
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

const ttfLoaderConfig = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: [
    fromRoot('node_modules/react-native-vector-icons'),
    fromRoot('src/assets/fonts'),
  ],
};

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    fromRoot('index.web.js'),
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: fromRoot('web/dist'),
  },

  plugins: [
    // Added 'HtmlWebpackPlugin' in order to use public/index.html from subfolder 'web' instead of, from the root
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
    new webpack.DefinePlugin({
      process: { env: {} },
      /**
       * Initially added this to fix "Uncaught ReferenceError: __DEV__ is not defined" error, caused by gesture-handler in 'FeedbackScene',
       * but was fixed after using TextInput component from 'react-native' instead of gesture-handler.
       */
      __DEV__: process.env.NODE_ENV !== 'production' || true,
    }),
  ],

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfig,
    ],
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.tsx', '.ts', '.web.js', '.js', '.jsx'],
  },
};
