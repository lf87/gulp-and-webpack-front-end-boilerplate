(function() {
    'use strict';
    var nunjucksRender = require('gulp-nunjucks-render'), // Nunjucks templating system
        autoprefixer = require('gulp-autoprefixer'), // Autoprefixes CSS using regular CSS
        neat = require('node-neat').includePaths, // The Bourbon Neat grid system
        sourcemaps = require('gulp-sourcemaps'), // Line numbers pointing to your SCSS files
        runSequence = require('run-sequence'), // Run tasks sequentially
        cleanCSS = require('gulp-clean-css'), // Refactors CSS and combines MQs (Prod only)
        scsslint = require('gulp-scss-lint'), // SCSS Linting
        stylish = require('jshint-stylish'), // Style your jshint results
        imagemin = require('gulp-imagemin'), // Compress Images
        fontmin = require('gulp-fontmin'), // Font minification - Can also generates CSS
        rename = require('gulp-rename'), // Rename files i.e. in this case rename minified files to .min
        concat = require('gulp-concat'), // Merges all files in to 1
        jshint = require('gulp-jshint'), // Lint your JS on the fly
        uglify = require('gulp-uglify'), // JS minification (Prod only)
        notify = require('gulp-notify'), // Notifications upon task completion
        svgmin = require('gulp-svgmin'), // Minimises SVGs
        newer = require('gulp-newer'), // A Gulp plugin for passing through only those source files that are newer than corresponding destination files.
        babel = require('gulp-babel'), // Legacy support for non ES2015 compatible browsers
        scss = require('gulp-sass'), // Libscss Pre-processor
        util = require('gulp-util'), // Used for prod deployment
        gulp = require('gulp'), // Gulp
        del = require('del'), // Clean folders and files
        browserSync = require('browser-sync').create(), // Create BS server
        htmlInjector = require('bs-html-injector'); // Injects markup

    // File Format
    var fileFormat = 'html',
        fileExt = '.' + fileFormat;

    // Paths object
    var src = {
        pages: 'src/pages/**/*' + fileExt,
        templates: 'src/templates/**/*',
        scss: 'src/styles/**/*.scss',
        js: 'src/scripts/**/*.js', // - if you change this path, then you'll need to update your .jshintignore file
        img: 'src/images/**/*.{png,jpg,gif}',
        svg: 'src/images/svgs/**/*.svg',
        fonts: 'src/fonts/**/*',
        docs: 'src/docs/**/*',
        favicons: 'src/favicons/**/*'
    };

    var dist = {
        pages: '',
        pagesWatch: './**/*',
        css: '',
        js: 'dist/assets/js',
        img: 'dist/assets/img',
        svg: 'dist/assets/img/svg',
        fonts: 'dist/assets/fonts',
        docs: 'dist/assets/docs',
        favicons: 'dist/assets/favicons'
    };

    var config = {
        maps: 'maps', // This is where your CSS and JS sourcemaps go
        reports: 'reports', // Lint reports go here
        lint: 'src/styles/*/**.scss', // Path of SCSS files that you want to lint
        lintExclude: '!src/styles/vendors/*.scss', // Path of SCSS files that you want to exclude from lint
        production: !!util.env.production // Used for prod deployment
    };

    // Browser Sync with HTML injection
    gulp.task('browser-sync', function() {
        browserSync.use(htmlInjector, {
            files: './*.html'
        });
        browserSync.init({
            server: './',
            files: './*.css'
        });
    });


    // Disable or enable pop up notifications
    var notifications = false;
    if (notifications) {
        process.env.DISABLE_NOTIFIER = true; // Uncomment to disables all notifications
    }

    // Files and folders to clean
    gulp.task('clean', function() {
        del([dist.pages + '*' + fileExt, dist.css + '/*.css', dist.js, dist.img, dist.fonts, dist.docs, dist.favicons, config.maps, config.reports]);
        return gulp.src('./')
            .pipe(notify({
                message: 'Folders cleaned successfully',
                onLast: true
            }));
    });

    // $ scss-lint - SCSS Linter
    gulp.task('scss-lint', function() {
        return gulp.src([config.lint + ', ' + config.lintExclude])
            .pipe(scsslint({
                'reporterOutputFormat': 'Checkstyle',
                'filePipeOutput': 'scssReport.xml',
                'config': 'scss-lint.yml'
            }))
            .pipe(gulp.dest(config.reports));
    });

    // ********************** //
    // *** Required Tasks *** //
    // ********************** //

    gulp.task('scss', function() {
        return gulp.src(src.scss)
            .pipe(sourcemaps.init())
            .pipe(scss({
                includePaths: [src.scss]
            }))
            .on('error', notify.onError(function(error) {
                return 'An error occurred while compiling scss.\nLook in the console for details.\n' + error;
            }))
            // FROM HERE:
            .pipe(config.production ? autoprefixer({
                cascade: false
            }) : util.noop())
            .pipe(config.production ? cleanCSS({ debug: true }, function(details) {
                console.log(details.name + ' file size before: ' + details.stats.originalSize + ' bytes');
                console.log(details.name + ' file size after: ' + details.stats.minifiedSize + ' bytes');
            }) : util.noop())
            // TO HERE
            .pipe(sourcemaps.write(config.maps))
            .pipe(gulp.dest(dist.css));
    });

    gulp.task('scripts', function() {
        return gulp.src(src.js)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(gulp.dest(dist.js))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(babel({
                presets: ['es2015']
            }))
            .on('error', notify.onError(function(error) {
                return 'An error occurred while compiling JS.\nLook in the console for details.\n' + error;
            }))
            .pipe(config.production ? uglify() : util.noop())
            .pipe(sourcemaps.write(config.maps))
            .pipe(gulp.dest(dist.js))
            .pipe(browserSync.stream({ once: true }))
    });

    gulp.task('nunjucks', function() {
        nunjucksRender.nunjucks.configure(['src/templates/**/*']);
        return gulp.src('src/pages/**.html')
            //.pipe(cache('markup'))
            .pipe(nunjucksRender({
                path: ['src/templates/'],
                ext: '.html',
                envOptions: {
                    //watch: true,
                    noCache : false
                },
            }))
            .on('error', notify.onError(function(error) {
                return 'An error occurred while compiling files.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(dist.pages))
    });

    // Save for web in PS first!
    gulp.task('images', function() {
        return gulp.src(src.img)
            .pipe(newer(dist.img))
            .pipe(imagemin({
                optimizationLevel: 7,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(dist.img))
            .pipe(browserSync.stream({ once: true }))
    });

    gulp.task('svgs', function() {
        return gulp.src(src.svg)
            .pipe(svgmin())
            .pipe(gulp.dest(dist.svg))
            .pipe(browserSync.stream({ once: true }))
    });

    gulp.task('fonts', function() {
        return gulp.src(src.fonts)
            .pipe(fontmin())
            .pipe(gulp.dest(dist.fonts))
            .pipe(browserSync.stream({ once: true }))
    });

    gulp.task('docs', function() {
        return gulp.src(src.docs)
            .pipe(gulp.dest(dist.docs))
            .pipe(browserSync.stream({ once: true }))
    });

    gulp.task('favicons', function() {
        return gulp.src(src.favicons)
            .pipe(gulp.dest(dist.favicons))
            .pipe(browserSync.stream({ once: true }))
    });


    // $ build - Runs all the required tasks then launches browser sync and watch for changes
    gulp.task('default', function() {
        runSequence(['nunjucks', 'scss', 'scripts'], ['images', 'svgs', 'fonts', 'docs', 'favicons'], ['browser-sync'], function() {
            // $ gulp watch - This is everything that's being watched when you run the default task
            gulp.watch(src.pages, ['nunjucks']);
            gulp.watch(src.templates, ['nunjucks']);
            gulp.watch('./*/**.html', htmlInjector);
            gulp.watch(src.scss, ['scss']);
            gulp.watch(src.js, ['scripts']);
            gulp.watch(src.img, ['images']);
            gulp.watch(src.svg, ['svgs']);
            gulp.watch(src.fonts, ['fonts']);
            gulp.watch(src.favicons, ['favicons']);
            gulp.watch(src.docs, ['docs']);
        });
    });

    /*    // $ build - Runs all the required tasks
        gulp.task('build', ['fileinclude', 'scss', 'scripts', 'images', 'svgs', 'fonts', 'docs', 'favicons']);

        // $ gulp - After running all required tasks, this will launch browser sync and watch for changes
        gulp.task('default', ['build', 'browser-sync', 'watch']);*/

}());
