/*jshint esversion: 8 */
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  mode: "development",
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, "dist"),
    // },
    // compress: false,
    // historyApiFallback: true,
    open: true,
    port: 8070,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
        exclude: "/node_modules/",
      },
    ],
  },
};
