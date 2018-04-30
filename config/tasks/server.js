import gulp from 'gulp' // Gulp
import htmlInjector from 'bs-html-injector' // Injects markup

const browserSync = require('browser-sync').create() // Create BS server
const Config = require('../config')

// Browser Sync with code/HTML injection
export function bs() {
  browserSync.use(htmlInjector, {
    files: `${Config.dist.pages}*${Config.fileExt}`
  })
  browserSync.init({
    server: Config.dist.pages,
    files: `${Config.dist.css}*.css`
    // watchOptions: {
    //     awaitWriteFinish: {
    //         stabilityThreshold: 500
    //     }
    // }
  })
}

export function bsReload() {
  return gulp.src(Config.dist.pages).pipe(
    browserSync.stream({
      once: true
    })
  )
}

// module.exports = {
//   bs,
//   bsReload
// }
