// webpack.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  mode: 'production', // Setting this to production auto enables JS uglify
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [['env', {modules: false}]]
        }
      }
    ]
  }
}
