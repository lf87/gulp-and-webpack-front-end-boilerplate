import gulp from 'gulp'
import del from 'del'
import notify from 'gulp-notify'

const Config = require('../config')

export function clean() {
  del([
    `${Config.dist.pages}*${Config.fileExt}`,
    `${Config.dist.css}/*.css`,
    `${Config.dist.webpack}`,
    `${Config.dist.img}`,
    `${Config.dist.fonts}`,
    `${Config.dist.static}`,
    `${Config.dest}`,
    `${Config.dist.production}`,
    `${Config.config.maps}`,
    `${Config.config.reports}`,
    './maps',
    './reports',
  ])
  return gulp.src(`${global}`).pipe(
    notify({
      message: 'Folders cleaned successfully',
      onLast: true
    })
  )
}

export function cleanProd() {
  del([
    `${Config.dist.production}`,
  ])
  return gulp.src(`${global}`).pipe(
    notify({
      message: 'Production folder cleaned successfully',
      onLast: true
    })
  )
}
