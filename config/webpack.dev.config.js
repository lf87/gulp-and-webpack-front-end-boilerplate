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
          presets: [['@babel/preset-env', {modules: false}]] // .babelrc to specify browser support | modules: false enables tree shaking
        }
      }
    ]
  },
  // Source maps
  devtool: 'eval-source-map'
}
