const webpack = require('webpack');
const path = require('path');

module.exports = function (context, options) {
  console.log('>>> adding polyfills for webpack');
  return {
    name: 'docusaurus-plugin-custom-webpack',
    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            {
              test: /\.js$/,
              include: path.resolve(__dirname, 'snippets/testsuite-javascript'),
              type: 'asset/source',
            },
            {
              test: /\.js$/,
              exclude: path.resolve(__dirname, 'snippets/testsuite-javascript'), // Exclude the directory
            },
          ],
        },
        resolve: {
          fallback: {
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            // buffer: require.resolve("buffer"),
          },
        },
        plugins: [
          // TODO: #66 - needed when we want to get rid of the `@web5/api/site`
          // new webpack.ProvidePlugin({
          //   process: "process/browser.js",
          // }),
          new webpack.NormalModuleReplacementPlugin(
            /node:crypto/,
            (resource) => {
              resource.request = resource.request.replace(/^node:/, '');
            },
          ),
          new webpack.ProvidePlugin({
            process: 'process/browser.js',
          }),
          new webpack.DefinePlugin({
            /*
             IMPORTANT: To fix debug library‘s bug
             {}.DEBUG = namespaces; // SyntaxError: Unexpected token '.'
            */
            'process.env.DEBUG': 'process.env.DEBUG',
          }),
        ],
      };
    },
  };
};
