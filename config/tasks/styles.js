import gulp from 'gulp'
import scss from 'gulp-sass'
import util from 'gulp-util'
import scsslint from 'gulp-scss-lint'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import notify from 'gulp-notify'
import sassGlob from 'gulp-sass-glob'

const critical = require('critical').stream
const Config = require('../config')

export function sass() {
  return gulp.src(Config.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(scss({
      includeConfigs: [Config.src.scss]
    }))
    .on('error', notify.onError(function(error) {
      return 'An error occurred while compiling scss.\nLook in the console for details.\n' + error
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 6-10'],
      cascade: false
    }))
    .pipe(Config.config.production ? cleanCSS({
      debug: true
    }, function(details) {
      console.log(`${details.name} file size before: ${details.stats.originalSize} bytes`)
      console.log(`${details.name} file size after: ${details.stats.minifiedSize} bytes`)
    }) : util.noop())
    .pipe(sourcemaps.write(Config.config.maps))
    .pipe(gulp.dest(Config.dist.css))
}

// Generate & inline critical-Config CSS
export function criticalCss() {
  return gulp.src(`${Config.dist.pages}/*fileExt`)
    .pipe(critical({
      base: Config.dist.pages,
      inline: true,
      css: Config.config.criticalCss,
      width: 1300,
      height: 900
    }))
    .on('error', function(err) {
      gutil.log(gutil.colors.red(err.message))
    })
    .pipe(gulp.dest(Config.dist.pages))
}

// $ scss-lint - SCSS Linter
export function scssLint() {
  return gulp.src([Config.config.lint, Config.config.lintExclude])
    .pipe(scsslint({
      'reporterOutputFormat': 'Checkstyle',
      'filePipeOutput': 'scssReport.xml',
      'config': 'scss-lint.yml'
    }))
    .pipe(gulp.dest(Config.config.reports))
}
