import gulp from 'gulp'

const browserSync = require('browser-sync').create()
const Config = require('../config')

// Browser Sync with markup injection
export function bs () {
  browserSync.init({
    server: Config.dist.pages,
    files: `${Config.dist.css}/*.css`
  })
}

export function bsReload () {
  return gulp.src(Config.dist.pages).pipe(
    browserSync.stream({
      once: true
    })
  )
}
