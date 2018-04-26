(function() {
  const nunjucksRender = require('gulp-nunjucks-render') // Nunjucks templating system
  const autoprefixer = require('gulp-autoprefixer') // Autoprefixes CSS using regular CSS
  const gulpPngquant = require('gulp-pngquant') // Optmise PNGs
  const sourcemaps = require('gulp-sourcemaps') // Line numbers pointing to your SCSS files
  const critical = require('critical').stream // Inlines above the fold CSS
  const cleanCSS = require('gulp-clean-css') // Refactors CSS and combines MQs (Prod only)
  const scsslint = require('gulp-scss-lint') // SCSS Linting
  const imagemin = require('gulp-imagemin') // Compress Images
  const changed = require('gulp-changed') // Caching
  const fontmin = require('gulp-fontmin') // Font minification - Can also generates CSS
  const notify = require('gulp-notify') // Notifications upon task completion
  const svgmin = require('gulp-svgmin') // Minimises SVGs
  const debug = require('gulp-debug') // Used for debugging
  const gutil = require('gulp-util') // Used for debugging
  const scss = require('gulp-sass') // Libscss Pre-processor
  const util = require('gulp-util') // Used for prod deployment
  const gulp = require('gulp') // Gulp
  const del = require('del') // Clean folders and files
  const webpack = require('webpack')
  const webpackStream = require('webpack-stream')
  const webpackConfig = require('./webpack.config.js')
  const browserSync = require('browser-sync').create() // Create BS server
  const htmlInjector = require('bs-html-injector') // Injects markup

  // File Format
  const fileFormat = 'html'
  const fileExt = '.' + fileFormat

  // Paths object
  const src = {
    pages: 'src/pages/*' + fileExt,
    templates: 'src/templates/**/*' + fileExt,
    scss: 'src/styles/**/*.scss',
    js: 'src/scripts/**/*.js', // - if you change this path, then you'll need to update your .jshintignore file
    img: 'src/images/**/*.{jpg,gif}',
    imgPng: 'src/images/**/*.png',
    svg: 'src/images/svgs/**/*.svg',
    fonts: 'src/fonts/**/*',
    docs: 'src/docs/**/*',
    favicons: 'src/favicons/**/*'
  }

  const dist = {
    pages: './',
    css: './',
    js: 'dist/assets/js',
    img: 'dist/assets/img',
    svg: 'dist/assets/img/svg',
    fonts: 'dist/assets/fonts',
    docs: 'dist/assets/docs',
    favicons: 'dist/assets/favicons'
  }

  const config = {
    maps: 'maps', // This is where your CSS and JS sourcemaps go
    reports: 'reports', // Lint reports go here
    lint: 'src/styles/**/*.scss', // Path of SCSS files that you want to lint
    lintExclude: '!src/styles/vendor/**/*.scss', // Path of SCSS files that you want to exclude from lint
    templates: ['src/templates/', 'src/templates/partials/'],
    pagesWatch: './*' + fileExt, // Directory where pages are output
    production: !!util.env.production, // Used for prod deployment
    criticalCss: dist.css + '/style.css' // Accepts arrays e.g. [dist.css + '/components.css', dist.css + '/main.css']
  }

  // Browser Sync with code/HTML injection
  function bs() {
    browserSync.use(htmlInjector, {
      files: dist.pages + '*' + fileExt
    })
    browserSync.init({
      server: dist.pages,
      files: dist.css + '*.css',
      // watchOptions: {
      //     awaitWriteFinish: {
      //         stabilityThreshold: 500
      //     }
      // }
    })
  }

  // Disable or enable pop up notifications
  const notifications = false
  if (notifications) {
    process.env.DISABLE_NOTIFIER = true // Uncomment to disables all notifications
  }

  // Files and folders to clean
  function clean() {
    del([dist.pages + '*' + fileExt, dist.css + '/*.css', dist.js, dist.img, dist.fonts, dist.docs, dist.favicons, config.maps, config.reports])
    return gulp.src('./')
      .pipe(notify({
        message: 'Folders cleaned successfully',
        onLast: true
      }))
  }

  // $ scss-lint - SCSS Linter
  function scssLint() {
    return gulp.src([config.lint, config.lintExclude])
      .pipe(scsslint({
        'reporterOutputFormat': 'Checkstyle',
        'filePipeOutput': 'scssReport.xml',
        'config': 'scss-lint.yml'
      }))
      .pipe(gulp.dest(config.reports))
  }

  // ********************** //
  // *** Required Tasks *** //
  // ********************** //

  function styles() {
    return gulp.src(src.scss)
      .pipe(sourcemaps.init())
      .pipe(scss({
        includePaths: [src.scss]
      }))
      .on('error', notify.onError(function(error) {
        return 'An error occurred while compiling scss.\nLook in the console for details.\n' + error
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie 6-10'],
        cascade: false
      }))
      .pipe(config.production ? cleanCSS({
        debug: true
      }, function(details) {
        console.log(details.name + ' file size before: ' + details.stats.originalSize + ' bytes')
        console.log(details.name + ' file size after: ' + details.stats.minifiedSize + ' bytes')
      }) : util.noop())
      .pipe(sourcemaps.write(config.maps))
      .pipe(gulp.dest(dist.css))
  }

  function scripts() {
    return gulp.src(src.js)
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest(dist.js))
      .pipe(browserSync.stream({
        once: true
      }))
  }

  function nunjucksPages() {
    nunjucksRender.nunjucks.configure([src.templates])
    return gulp.src(src.pages)
      .pipe(debug({
        title: 'nunjucks pages:'
      }))

      .pipe(changed(dist.pages, {
        hasChanged: changed.compareLastModifiedTime
      }))
      .pipe(nunjucksRender({
        path: config.templates,
        ext: fileExt
      }))
      .on('error', notify.onError(function(error) {
        return 'An error occurred while compiling files.\nLook in the console for details.\n' + error
      }))
      .on('data', function() {
        gutil.log('Alert nunjucksPages()!')
      })
      .pipe(gulp.dest(dist.pages))
  }

  // Temporary workaround to get HTML injection working when editing pages is to create duplicate task and not include the caching plugin
  function nunjucksTemplates() {
    nunjucksRender.nunjucks.configure([src.templates])
    return gulp.src([src.pages])
      .pipe(debug({
        title: 'nunjucks templates:'
      }))
      .pipe(nunjucksRender({
        path: config.templates,
        ext: fileExt
      }))
      .on('error', notify.onError(function(error) {
        return 'An error occurred while compiling files.\nLook in the console for details.\n' + error
      }))
      .on('data', function() {
        gutil.log('Alert nunjucksTemplates()!')
      })
      .pipe(gulp.dest(dist.pages))
  }

  // Save for web in PS first!
  function images() {
    return gulp.src(src.img, {
        allowEmpty: true
      })
      .pipe(changed(dist.img, {
        hasChanged: changed.compareLastModifiedTime
      }))
      .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(dist.img))
      .pipe(browserSync.stream({
        once: true
      }))
  }

  function imagesPng() {
    return gulp.src(src.imgPng, {
        allowEmpty: true
      })
      .pipe(changed(dist.img, {
        hasChanged: changed.compareLastModifiedTime
      }))
      .pipe(gulpPngquant({
        quality: '65-80'
      }))
      .pipe(gulp.dest(dist.img))
      .pipe(browserSync.stream({
        once: true
      }))
  }

  function svgs() {
    return gulp.src(src.svg, {
        allowEmpty: true
      })
      .pipe(changed(dist.svg, {
        hasChanged: changed.compareLastModifiedTime
      }))
      .pipe(svgmin())
      .pipe(gulp.dest(dist.svg))
      .pipe(browserSync.stream({
        once: true
      }))
  }

  function fonts() {
    return gulp.src(src.fonts, {
        allowEmpty: true
      })
      .pipe(changed(dist.fonts, {
        hasChanged: changed.compareLastModifiedTime
      }))
      .pipe(fontmin())
      .pipe(gulp.dest(dist.fonts))
      .pipe(browserSync.stream({
        once: true
      }))
  }

  function docs() {
    return gulp.src(dist.docs, {
        allowEmpty: true
      })
      .pipe(changed(dist.docs, {
        hasChanged: changed.compareLastModifiedTime
      }))
      .pipe(gulp.dest(dist.docs))
      .pipe(browserSync.stream({
        once: true
      }))
  }

  function favicons() {
    return gulp.src(dist.favicons, {
        allowEmpty: true
      })
      .pipe(changed(dist.favicons, {
        hasChanged: changed.compareLastModifiedTime
      }))
      .pipe(gulp.dest(dist.favicons))
      .pipe(browserSync.stream({
        once: true
      }))
  }
  // Generate & inline critical-path CSS
  function criticalCss() {
    return gulp.src(dist.pages + '/*' + fileExt)
      .pipe(critical({
        base: dist.pages,
        inline: true,
        css: config.criticalCss,
        width: 1300,
        height: 900
      }))
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.message))
      })
      .pipe(gulp.dest(dist.pages))
  }

  function bsReload() {
    return gulp.src(dist.pages)
      .pipe(browserSync.stream({
        once: true
      }))
  }

  function watch() {
    gulp.watch(src.pages, gulp.series(nunjucksPages))
    gulp.watch(src.templates, gulp.series(nunjucksTemplates))
    gulp.watch(config.pagesWatch, gulp.series(htmlInjector))
    gulp.watch(src.scss, gulp.series('styles'))
    gulp.watch(src.js, gulp.series('scripts'))
    gulp.watch(src.img, gulp.series('images'))
    gulp.watch(src.imgPng, gulp.series('imagesPng'))
    gulp.watch(src.svg, gulp.series('svgs'))
    gulp.watch(src.fonts, gulp.series('fonts'))
    gulp.watch(src.favicons, gulp.series('favicons'))
    gulp.watch(src.docs, gulp.series('docs'))
  }

  // Use CommonJS 'exports' module notation to declare tasks
  exports.nunjucksPages = nunjucksPages
  exports.nunjucksTemplates = nunjucksTemplates
  exports.styles = styles
  exports.scripts = scripts
  exports.images = images
  exports.imagesPng = imagesPng
  exports.svgs = svgs
  exports.fonts = fonts
  exports.favicons = favicons
  exports.docs = docs
  exports.bs = bs
  exports.watch = watch
  exports.bsReload = bsReload
  exports.bsReload = criticalCss

  // Runs all the required tasks (in order), launches browser sync, and watches for changes
  const build = gulp.series(clean, gulp.parallel(nunjucksPages, styles, images, imagesPng, svgs, fonts, docs, favicons))
  const run = gulp.parallel(bs, watch)

  gulp.task('clean', gulp.series(clean))
  gulp.task('critical', gulp.series(criticalCss))
  gulp.task('scss-lint', gulp.series(scssLint))
  gulp.task('default', gulp.series(build, run))

}())
