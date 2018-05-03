import gulp from 'gulp'
import changed from 'gulp-changed'

const Config = require('../config')

export function duplicateFiles() {
  return gulp.src(Config.src.static, {
        allowEmpty: true,
        nodir: true
      })
      .pipe(changed(Config.dist.static, {
        hasChanged: changed.compareLastModifiedTime
      }))
  .pipe(gulp.dest(Config.dist.static))
}

export function duplicateProdFiles() {
  return gulp.src(`${Config.dest}/**/*`)
  .pipe(gulp.dest(Config.dist.production))
}
