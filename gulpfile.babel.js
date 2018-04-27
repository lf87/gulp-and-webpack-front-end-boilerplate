  // import nunjucksRender from 'gulp-nunjucks-render' // Templating system
  // import autoprefixer from 'gulp-autoprefixer' // Autoprefixes CSS using regular CSS
  // import gulpPngquant from 'gulp-pngquant' // Optmise PNGs
  // import sourcemaps from 'gulp-sourcemaps' // Line numbers pointing to your SCSS files
  // import cleanCSS from 'gulp-clean-css' // Refactors CSS and combines MQs (Prod only
  // import scsslint from 'gulp-scss-lint' // SCSS Linting
  // import imagemin from 'gulp-imagemin' // Compress Images
  // import changed from 'gulp-changed' // Caching
  // import fontmin from 'gulp-fontmin' // Font minification - Can also generates CSS
  // import notify from 'gulp-notify' // Notifications upon task completion
  // import svgmin from 'gulp-svgmin' // Minimises SVGs
  // import debug from 'gulp-debug' // Used for debugging
  // import gutil from 'gulp-util' // Used for debugging
  // import scss from 'gulp-sass' // Libscss Pre-processor
  // import util from 'gulp-util' // Used for prod deployment
  // import del from 'del' // Clean folders and files
  // import webpackStream from 'webpack-stream'
  // import webpack from 'webpack'
  // import webpackConfig from './webpack.config.js'
  // import htmlInjector from 'bs-html-injector' // Injects markup
  // const browserSync = require('browser-sync').create() // Create BS server
  import gulp from 'gulp' // Gulp
  
  import {clean} from './config/tasks/clean'
  import {nunjucksPages} from './config/tasks/templating'
  import {nunjucksTemplates} from './config/tasks/templating'
  import {sass} from './config/tasks/styles'
  import {criticalCss} from './config/tasks/styles'
  import {scssLint} from './config/tasks/styles'
  import {fonts} from './config/tasks/fonts'
  import {images} from './config/tasks/images'
  import {imagesPng} from './config/tasks/images'
  import {svgs} from './config/tasks/images'
  import {duplicateFiles} from './config/tasks/duplicate-files'
  import {bs} from './config/tasks/server'
  import {bsReload} from './config/tasks/server'
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

  // Runs all the required tasks (in order), launches browser sync, and watches for changes
  const build = gulp.series(clean, gulp.parallel(nunjucksPages, sass, webpackBundle, images, imagesPng, svgs, fonts, duplicateFiles))
  // const build = gulp.series(clean, gulp.parallel(sass))  
  const run = gulp.parallel(bs, watch)

  gulp.task('clean', gulp.series(clean))
  gulp.task('critical', gulp.series(criticalCss))
  gulp.task('scss-lint', gulp.series(scssLint))
  gulp.task('default', gulp.series(build, run))
  gulp.task('test', gulp.series(sass))
