import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackConfigDev from '../webpack.dev.config.js'
import webpackConfigProd from '../webpack.prod.config.js'
import gulp from 'gulp'

const Config = require('../config')

export function webpackBundle() {
return gulp.src(Config.src.webpack)
  // If production flag set during build, then use webpacks production config file
  .pipe(Config.config.production ? webpackStream(webpackConfigProd, webpack) : webpackStream(webpackConfigDev, webpack))
  .on('error', function handleError() {
    this.emit('end')
  })
  .pipe(gulp.dest(Config.dist.webpack))
}

