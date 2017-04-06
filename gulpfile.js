(function() {
    'use strict';
    var fileinclude = require('gulp-file-include'), // Include partials
        autoprefixer = require('gulp-autoprefixer'), // Autoprefixes CSS using regular CSS
        neat = require('node-neat').includePaths, // The Bourbon Neat grid system
        sourcemaps = require('gulp-sourcemaps'), // Line numbers pointing to your SCSS files
        browserSync = require('browser-sync'), // Live reloading
        cleanCSS = require('gulp-clean-css'), // Replaces css-nano, this will also combine MQs
        scsslint = require('gulp-scss-lint'), // SCSS Linting
        stylish = require('jshint-stylish'), // Style your jshint results
        imagemin = require('gulp-imagemin'), // Compress Images
        fontmin = require('gulp-fontmin'), // Font minification - Also generates CSS
        rename = require('gulp-rename'), // Rename files i.e. in this case rename minified files to .min
        concat = require('gulp-concat'), // Merges all files in to 1
        jshint = require('gulp-jshint'), // Lint your JS on the fly
        uglify = require('gulp-uglify'), // JS minification
        notify = require('gulp-notify'), // Notifications upon task completion
        svgmin = require('gulp-svgmin'), // Minimises SVGs
        newer = require('gulp-newer'), // A Gulp plugin for passing through only those source files that are newer than corresponding destination files.
        babel = require('gulp-babel'), // Optimise SVGs
        scss = require('gulp-sass'), // Libscss Pre-processor
        gulp = require('gulp'), // Gulp
        del = require('del'), // Clean folders of files
        reload = browserSync.reload;

    // File Format
    var fileFormat = 'html',
        fileExt = '.' + fileFormat;

    // Paths object
    var src = {
        pages: 'src/components/**/*' + fileExt,
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
        css: '',
        js: 'dist/assets/js',
        img: 'dist/assets/img',
        svg: 'dist/assets/img/svg',
        fonts: 'dist/assets/fonts',
        docs: 'dist/assets/docs',
        favicons: 'dist/assets/favicons'
    };

    var misc = {
        maps: 'maps', // This is where your CSS and JS sourcemaps go
        reports: 'reports',
        lint: 'src/styles/*/**.scss', // Path of SCSS files that you want to lint
        lintExclude: '!src/styles/vendors/*.scss' // Path of SCSS files that you want to exclude from lint
    };

    // Browser Sync
    gulp.task('browser-sync', function() {
        browserSync.init({
            server: './',
            //proxy: 'proxy.dev',
            files: '*.css' // Injects CSS changes
        });
    });

    // Disable or enable pop up notifications
    var notifications = false;
    if (notifications) {
        process.env.DISABLE_NOTIFIER = true; // Uncomment to disables all notifications
    }

    // Files and folders to clean
    gulp.task('clean', function() {
        del([dist.pages + '*' + fileExt, dist.css + '/*.css', dist.js, dist.img, dist.fonts, dist.docs, dist.favicons, misc.maps, misc.reports]);
        return gulp.src('./')
            .pipe(notify({
                message: 'Folders cleaned successfully',
                onLast: true
            }));
    });

    // $ scss-lint - SCSS Linter
    gulp.task('scss-lint', function() {
        return gulp.src([misc.lint + ', ' + misc.lintExclude])
            .pipe(scsslint({
                'reporterOutputFormat': 'Checkstyle',
                'filePipeOutput': 'scssReport.xml',
                'config': 'scss-lint.yml'
            }))
            .pipe(gulp.dest(misc.reports));
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
            // Comment out the 2 code below to enable exact line number for sourcemaps (workaround for the issue)
            // Remember to re-enable before testing and/or pushing to staging/prod
            // FROM HERE:
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({ debug: true }, function(details) {
                console.log(details.name + ' file size before: ' + details.stats.originalSize + ' bytes');
                console.log(details.name + ' file size after: ' + details.stats.minifiedSize + ' bytes');
            }))
            // TO HERE
            .pipe(sourcemaps.write(misc.maps))
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
            .pipe(uglify())
            .pipe(sourcemaps.write(misc.maps))
            .pipe(gulp.dest(dist.js))
            .pipe(reload({
                stream: true
            }));
    });

    gulp.task('fileinclude', function() {
        return gulp.src(src.pages)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
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
            .pipe(reload({
                stream: true
            }));
    });

    gulp.task('svgs', function() {
        return gulp.src(src.svg)
            .pipe(svgmin())
            .pipe(gulp.dest(dist.svg))
            .pipe(reload({
                stream: true
            }));
    });

    gulp.task('fonts', function() {
        return gulp.src(src.fonts)
            .pipe(fontmin())
            .pipe(gulp.dest(dist.fonts))
            .pipe(reload({
                stream: true
            }));
    });

    gulp.task('docs', function() {
        return gulp.src(src.docs)
            .pipe(gulp.dest(dist.docs))
            .pipe(reload({
                stream: true
            }));
    });

    gulp.task('favicons', function() {
        return gulp.src(src.favicons)
            .pipe(gulp.dest(dist.favicons))
            .pipe(reload({
                stream: true
            }));
    });

    // Runs after fileinclude task has fully completed
    gulp.task('fileinclude-watch', ['fileinclude'], function(done) {
        browserSync.reload();
        done();
    });

    // $ gulp watch - This is everything that's being watched when you run the default task
    gulp.task('watch', function() {
        gulp.watch(src.pages, ['fileinclude']);
        gulp.watch(src.scss, ['scss']);
        gulp.watch(src.js, ['scripts']);
        gulp.watch(src.img, ['images']);
        gulp.watch(src.svg, ['svgs']);
        gulp.watch(src.fonts, ['fonts']);
        gulp.watch(src.favicons, ['favicons']);
        gulp.watch(src.docs, ['docs']);
        gulp.watch('*' + fileExt, ['fileinclude-watch']);
    });

    // $ build - Runs all the required tasks
    gulp.task('build', ['fileinclude', 'scss', 'scripts', 'images', 'svgs', 'fonts', 'docs', 'favicons']);

    // $ gulp - After running all required tasks, this will launch browser sync and watch for changes
    gulp.task('default', ['build', 'browser-sync', 'watch']);

}());
