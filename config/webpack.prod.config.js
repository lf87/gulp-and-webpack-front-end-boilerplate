// webpack.config.js
const {GenerateSW} = require('workbox-webpack-plugin')

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
  },
  plugins: [
    // Workbox - Generate Service Worker
    new GenerateSW()
  ]
}
