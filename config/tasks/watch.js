import gulp from 'gulp'
import htmlInjector from 'bs-html-injector'

const Config = require('../config')

export function watch() {
  gulp.watch(Config.src.pages, gulp.series('nunjucksPages'))
  gulp.watch([Config.src.templates, Config.src.dataFile], gulp.series('nunjucksTemplates', 'bsReload'))
  gulp.watch(Config.config.pagesWatch, gulp.series(htmlInjector))
  gulp.watch(Config.src.scss, gulp.series('sass'))
  gulp.watch(Config.src.webpack, gulp.series('webpackBundle', 'bsReload'))
  gulp.watch(Config.src.img, gulp.series('images', 'bsReload'))
  gulp.watch(Config.src.imgPng, gulp.series('imagesPng', 'bsReload'))
  gulp.watch(Config.src.svg, gulp.series('svgs', 'bsReload'))
  gulp.watch(Config.src.fonts, gulp.series('fonts', 'bsReload'))
  gulp.watch(Config.src.static, gulp.series('duplicateFiles', 'bsReload'))
}
