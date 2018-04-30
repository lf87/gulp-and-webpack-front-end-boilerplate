import gulp from 'gulp'
import changed from 'gulp-changed'
import fontmin from 'gulp-fontmin'

const Config = require('../config')

export function fonts() {
  return gulp
    .src(Config.src.fonts, {
      allowEmpty: true
    })
    .pipe(
      changed(Config.dist.fonts, {
        hasChanged: changed.compareLastModifiedTime
      })
    )
    .pipe(fontmin())
    .pipe(gulp.dest(Config.dist.fonts))
}
