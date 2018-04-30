import gulp from 'gulp'
import changed from 'gulp-changed'

const Config = require('../config')

export function duplicateFiles() {
  return gulp.src([Config.src.docs, Config.src.favicons], {
      allowEmpty: true
    })
    .pipe(changed(Config.dist.docs, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(gulp.dest(Config.dist.docs))
}
