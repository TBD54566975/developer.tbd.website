const webpack = require("webpack");

module.exports = function (context, options) {
  console.log('>>> adding polyfills for webpack');
  return {
    name: "docusaurus-plugin-custom-webpack",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            stream: require.resolve("stream-browserify"),
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve("buffer")
          }
        },
        plugins: [
          new webpack.NormalModuleReplacementPlugin(
            /node:crypto/,
            (resource) => {
              resource.request = resource.request.replace(/^node:/, "");
            }
          ),
          new webpack.ProvidePlugin({
            process: "process/browser.js",
          }),
          new webpack.DefinePlugin({
            /*
             IMPORTANT: To fix debug library‘s bug
             {}.DEBUG = namespaces; // SyntaxError: Unexpected token '.'
            */
            'process.env.DEBUG': 'process.env.DEBUG'
          })
        ]
      };
    }
  };
};
