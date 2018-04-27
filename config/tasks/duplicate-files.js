import gulp from 'gulp' // Gulp
import changed from 'gulp-changed' // Caching

const Config = require('../config')

export function duplicateFiles() {
  return gulp.src([Config.dist.docs, Config.dist.favicons], {
      allowEmpty: true
    })
    .pipe(changed(Config.dist.docs, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(gulp.dest(Config.dist.docs))
    // .pipe(browserSync.stream({
    //   once: true
    // }))
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
