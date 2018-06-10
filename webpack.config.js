const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const npmPackage = require("./package.json");

module.exports = {
  entry: "./webapp/common/bootstrap.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  devtool: "source-map",
  resolve: {
    // root: __dirname,
    alias: {
      "@webapp": path.resolve(__dirname, "webapp"),
      "@photos": path.resolve(__dirname, "photos"),
      "@flickr": path.resolve(__dirname, "flickr")
    },
    // modules: npmPackage._moduleDirectories || [],
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "webapp", "index.html")
    })
  ]
};