// webpack.config.js
const {GenerateSW} = require('workbox-webpack-plugin')
const Config = require('./config')

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
          presets: [['@babel/preset-env', {modules: false}]]
        }
      }
    ]
  },
  plugins: [
    // Workbox - Generate Service Worker
    new GenerateSW({
      globDirectory: Config.dest,
      globPatterns: [
        '**/*.{html,js,css,png,jpg,svg}'
      ],
      swDest: 'sw.js'
    })
  ]
}
