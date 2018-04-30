import gulp from 'gulp'

// Import tasks as functions
import {clean} from './config/tasks/clean'
import {nunjucksPages, nunjucksTemplates} from './config/tasks/templating'
import {sass, criticalCss, scssLint} from './config/tasks/styles'
import {fonts} from './config/tasks/fonts'
import {images, imagesPng, svgs} from './config/tasks/images'
import {duplicateFiles} from './config/tasks/duplicate-files'
import {bs, bsReload} from './config/tasks/server'
import {watch} from './config/tasks/watch'
import {webpackBundle} from './config/tasks/webpack'

// Use CommonJS 'exports' module notation to declare tasks
exports.clean = clean
exports.nunjucksPages = nunjucksPages
exports.nunjucksTemplates = nunjucksTemplates
exports.webpackBundle = webpackBundle
exports.sass = sass
exports.criticalCss = criticalCss
exports.scssLint = scssLint
exports.images = images
exports.imagesPng = imagesPng
exports.svgs = svgs
exports.fonts = fonts
exports.duplicateFiles = duplicateFiles
exports.watch = watch
exports.bs = bs
exports.bsReload = bsReload

// Define build and run order
const build = gulp.series(clean, gulp.parallel(nunjucksPages, sass, webpackBundle, images, imagesPng, svgs, fonts, duplicateFiles))
const run = gulp.parallel(bs, watch)

// Runs all the required tasks (in order), launches browser sync, and watches for changes
gulp.task('default', gulp.series(build, run))

// Additional tasks
gulp.task('clean', gulp.series(clean))
gulp.task('critical', gulp.series(criticalCss))
gulp.task('scss-lint', gulp.series(scssLint))
