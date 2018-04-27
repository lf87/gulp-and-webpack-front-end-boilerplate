import gulp from 'gulp' // Gulp
import del from 'del' // Clean folders and files
import notify from 'gulp-notify' // Notifications upon task completion

const Config = require('../config')

export function clean() {
  // del([
  //   `${Config.dist.pages}*${Config.fileExt}`,
  //   `${Config.dist.css}/*.css`,
  //   Config.dist.js,
  //   Config.dist.img,
  //   Config.dist.fonts,
  //   Config.dist.docs,
  //   Config.dist.favicons,
  //   Config.config.maps,
  //   Config.config.reports
  // ])
  return gulp.src('./').pipe(
    notify({
      message: 'Folders cleaned successfully',
      onLast: true
    })
  )
}

// module.exports = {
//   clean
// }
