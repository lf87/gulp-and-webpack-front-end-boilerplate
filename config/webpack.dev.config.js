// webpack.config.js

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      // ES Lint
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the jshint loader
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // Babel transpiler
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [['env', {modules: false}]]
        }
      }
    ]
  },
  // Source maps
  devtool: 'eval-source-map'
}
