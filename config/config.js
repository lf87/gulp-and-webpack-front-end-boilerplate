import util from 'gulp-util'

// Disable or enable pop up notifications
const notifications = false
if (notifications) {
  process.env.DISABLE_NOTIFIER = true // Uncomment to disables all notifications
}

// Paths
const fileExt = '.html' // Default file extension
const source = 'src'
const root = '.'
const dest = 'dist'
const assets = 'assets'

const src = {
  pages: `${source}/pages/*${fileExt}`,
  templates: `${source}/templates/**/*${fileExt}`,
  scss: `${source}/styles/**/*.scss`,
  webpack: `${source}/scripts/**/*.js`,
  img: `${source}/img/**/*.{jpg,gif}`,
  imgPng: `${source}/img/**/*.png`,
  svg: `${source}/img/svgs/**/*.svg`,
  fonts: `${source}/fonts/**/*`,
  static: `${source}/static/**/*`
}

const dist = {
  pages: `${root}/${dest}`,
  css: `${root}/${dest}`,
  static: `${dest}/${assets}`,
  webpack: `${dest}/${assets}/js`,
  img: `${dest}/${assets}/img`,
  svg: `${dest}/${assets}/img/svgs`,
  fonts: `${dest}/${assets}/fonts`,
  production: `${root}/production`
}

const config = {
  maps: `${root}/maps`, // This is where your CSS sourcemaps are saved
  reports: `${root}/reports`, // Lint reports saved here
  lint: `${source}/styles/**/*.scss`, // Path of SCSS files that you want to lint
  lintExclude: `!${source}/styles/vendor/**/*.scss`, // Path of SCSS files that you want to exclude from lint
  templates: [`${source}/templates/`, `${source}/templates/partials/`], // Default file paths for nunjucks
  pagesWatch: `${root}*${fileExt}`, // HTML injection  - This is the directory where pages are output
  production: !!util.env.production, // Used for production deployment
  criticalCss: dist.css + '/style.css' // Accepts arrays e.g. [dist.css + '/components.css', dist.css + '/main.css']
}

module.exports = {
  source,
  dest,
  assets,
  fileExt,
  src,
  dist,
  config,
}
