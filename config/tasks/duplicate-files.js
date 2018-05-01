import gulp from 'gulp'
import changed from 'gulp-changed'

const Config = require('../config')

export function duplicateFiles() {
  return gulp.src(Config.src.static, {
      allowEmpty: true
    })
    .pipe(changed(Config.dist.static, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(gulp.dest(Config.dist.static))
}
