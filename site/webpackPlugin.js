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
              resource.request = resource.request.replace(/^node:/, "");
            }
          ),
        ],
      };
    },
  };
};
