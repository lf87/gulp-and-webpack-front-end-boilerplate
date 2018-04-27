import gulp from 'gulp' // Gulp
import changed from 'gulp-changed' // Caching
import fontmin from 'gulp-fontmin' // Font minification - Can also generates CSS

const Config = require('../config')

export function fonts() {
  return gulp.src(Config.src.fonts, {
      allowEmpty: true
    })
    .pipe(changed(Config.dist.fonts, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(fontmin())
    .pipe(gulp.dest(Config.dist.fonts))
    // .pipe(browserSync.stream({
    //   once: true
    // }))
}

// module.exports = {
//   fonts
// }
