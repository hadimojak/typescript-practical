const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

/* eslint-disable no-undef */
module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
//   devtool: "none",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node-modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: "production",
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
