import gulp from 'gulp'

// Import tasks/functions
import {clean, cleanProd} from './config/tasks/clean'
import {nunjucksPages, nunjucksTemplates} from './config/tasks/templating'
import {sass, criticalCss, scssLint} from './config/tasks/styles'
import {fonts} from './config/tasks/fonts'
import {images, imagesPng, svgs} from './config/tasks/images'
import {duplicateFiles, duplicateProdFiles} from './config/tasks/duplicate-files'
import {bs, bsReload} from './config/tasks/server'
import {watch} from './config/tasks/watch'
import {webpackBundle} from './config/tasks/webpack'

// Use CommonJS 'exports' module notation to declare tasks
exports.clean = clean
exports.cleanProd = cleanProd
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
exports.duplicateProdFiles = duplicateProdFiles
exports.watch = watch
exports.bs = bs
exports.bsReload = bsReload

// Define build and run tasks
const build = gulp.parallel(nunjucksPages, sass, webpackBundle, images, imagesPng, svgs, fonts, duplicateFiles)
const run = gulp.parallel(bs, watch)

// Additional tasks that may/will need to be run individually
gulp.task('clean', gulp.series(clean))
gulp.task('critical', gulp.series(criticalCss))
gulp.task('scss-lint', gulp.series(scssLint))

// Default task - Cleans dist files/folders, Runs all the build tasks, launches browser sync, and watches for changes
gulp.task('default', gulp.series(build, run))
gulp.task('build', gulp.series(cleanProd, build, duplicateProdFiles))

