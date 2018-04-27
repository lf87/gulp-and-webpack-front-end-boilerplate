import gulp from 'gulp'
import htmlInjector from 'bs-html-injector'
// import browserSync from 'browser-sync'

const Config = require('../config')

export function watch() {
  gulp.watch(Config.src.pages, gulp.series('nunjucksPages'))
  gulp.watch(Config.src.templates, gulp.series('nunjucksTemplates'))
  gulp.watch(Config.config.pagesWatch, gulp.series(htmlInjector))
  gulp.watch(Config.src.scss, gulp.series('sass'))
  gulp.watch(Config.src.js, gulp.series('webpackBundle'))
  gulp.watch(Config.src.img, gulp.series('images'))
  gulp.watch(Config.src.imgPng, gulp.series('imagesPng'))
  gulp.watch(Config.src.svg, gulp.series('svgs'))
  gulp.watch(Config.src.fonts, gulp.series('fonts'))
  gulp.watch(Config.src.docs, gulp.series('duplicateFiles'))
}

// module.exports = {
//   watch
// }
