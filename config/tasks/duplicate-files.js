import gulp from 'gulp'
import changed from 'gulp-changed'
import notify from 'gulp-notify'

const Config = require('../config')

export function duplicateFiles () {
  return gulp.src(Config.src.static, {
    allowEmpty: true,
    nodir: true
  })
    .pipe(changed(Config.dist.static, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(gulp.dest(Config.dist.static))
}

export function duplicateProdFiles () {
  return gulp.src(`${Config.dest}/**/*`, {
    allowEmpty: true,
    nodir: true
  })
    .pipe(gulp.dest(Config.dist.production))
    .pipe(notify({ message: `The assets have been copied to ${Config.dist.production}`, onLast: true }))
}
