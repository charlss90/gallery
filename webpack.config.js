require("module-alias/register");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { injectFlickr } = require("./dist/api");

module.exports = {
  entry: "./webapp/common/bootstrap.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    before: function (app) {
      injectFlickr("59e9561e02d8a39f946bc73f01d4d6d1", app);
    }
  },
  resolve: {
    // root: __dirname,
    alias: {
      "@webapp": path.resolve(__dirname, "webapp"),
      "@common": path.resolve(__dirname, "common"),
      "@photos": path.resolve(__dirname, "photos"),
      "@flickr": path.resolve(__dirname, "flickr")
    },
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