import gulp from 'gulp'
import changed from 'gulp-changed'
import gulpPngquant from 'gulp-pngquant'
import imagemin from 'gulp-imagemin'
import svgmin from 'gulp-svgmin'

const Config = require('../config')

// Save for web in PS first!
export function images() {
  return gulp.src(Config.src.img, {
      allowEmpty: true
    })
    .pipe(changed(Config.dist.img, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(Config.dist.img))
    // .pipe(browserSync.stream({
    //   once: true
    // }))
}

export function imagesPng() {
  return gulp.src(Config.src.imgPng, {
      allowEmpty: true
    })
    .pipe(changed(Config.dist.img, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(gulpPngquant({
      quality: '65-80'
    }))
    .pipe(gulp.dest(Config.dist.img))
    // .pipe(browserSync.stream({
    //   once: true
    // }))
}

export function svgs() {
  return gulp.src(Config.src.svg, {
      allowEmpty: true
    })
    .pipe(changed(Config.dist.svg, {
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(svgmin())
    .pipe(gulp.dest(Config.dist.svg))
    // .pipe(browserSync.stream({
    //   once: true
    // }))
}

// module.exports = {
//   images,
//   imagesPng,
//   svgs
// }
