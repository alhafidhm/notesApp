const HtmlWebpackPlugin = require("html-webpack-plugin");
const { watch } = require("fs");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/script.js",
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "bundle.js",
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
