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

// below shouldn't be needed but will keep in case
// export const favicons = () => {
//   return gulp.src(Config.dist.favicons, {
//       allowEmpty: true
//     })
//     .pipe(changed(Config.dist.favicons, {
//       hasChanged: changed.compareLastModifiedTime
//     }))
//     .pipe(gulp.dest(Config.dist.favicons))
//     .pipe(browserSync.stream({
//       once: true
//     }))
// }

// module.exports = {
//  duplicateFiles
// }
