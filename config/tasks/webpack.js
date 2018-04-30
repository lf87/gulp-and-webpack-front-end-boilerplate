import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackConfigDev from '../webpack.dev.config.js'
import webpackConfigProd from '../webpack.prod.config.js'
import gulp from 'gulp'

const Config = require('../config')

export function webpackBundle() {
// const options = {
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {'NODE_ENV': 'production'}
//     }),
//     // new webpack.optimize.UglifyJsPlugin()
//   ]
// }
return gulp.src(Config.src.webpack)

  .pipe(Config.config.production ? webpackStream(webpackConfigProd, webpack) : webpackStream(webpackConfigDev, webpack))
  .on('error', function handleError() {
    this.emit('end')
  })
  .pipe(gulp.dest(Config.dist.webpack))
  // .pipe(browserSync.stream({
  //   once: true
  // }))
}

// module.exports = {
//   webpack
// }
