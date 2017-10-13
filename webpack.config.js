const path = require('path');

module.exports = {
  entry: "./src/index",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "semver.js",
    library: "semverLite",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ],
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json"],
  },
  context: __dirname,
  target: "web"
};