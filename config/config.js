// Disable or enable pop up notifications
const notifications = false
if (notifications) {
  process.env.DISABLE_NOTIFIER = true // Uncomment to disables all notifications
}

// const browserSync = require('browser-sync').create() // Create BS server
// const critical = require('critical').stream // Inlines above the fold CSS

const source = 'src'
const dest = 'dist'

// // File Format
const fileFormat = 'html'
const fileExt = `.${fileFormat}`

// Paths object
const src = {
  pages: `${source}/pages/*${fileExt}`,
  templates: `${source}/templates/**/*${fileExt}`,
  scss: `${source}/styles/**/*.scss`,
  webpack: `${source}/scripts/**/*.js`,
  img: `${source}/images/**/*.{jpg,gif}`,
  imgPng: `${source}/images/**/*.png`,
  svg: `${source}/images/svgs/**/*.svg`,
  fonts: `${source}/fonts/**/*`,
  docs: `${source}/docs/**/*`,
  favicons: `${source}/favicons/**/*`
}

const dist = {
  pages: './',
  css: './',
  webpack: `${dest}/assets/js`,
  img: `${dest}/assets/img`,
  svg: `${dest}/assets/img/svg`,
  fonts: `${dest}/assets/fonts`,
  docs: `${dest}/assets/docs`,
  favicons: `${dest}/assets/favicon`
}

const config = {
  maps: 'maps', // This is where your CSS and JS sourcemaps go
  reports: 'reports', // Lint reports go here
  lint: `${source}/styles/**/*.scss`, // Path of SCSS files that you want to lint
  lintExclude: `!${source}/styles/vendor/**/*.scss`, // Path of SCSS files that you want to exclude from lint
  templates: [`${source}/templates/`, `${source}/templates/partials/`],
  pagesWatch: `./*${fileExt}` // Directory where pages are output
  // production: !!util.env.production, // Used for prod deployment
  // criticalCss: dist.css + '/style.css' // Accepts arrays e.g. [dist.css + '/components.css', dist.css + '/main.css']
}

module.exports = {
  // dir,
  source,
  dest,
  src,
  dist,
  config
}
