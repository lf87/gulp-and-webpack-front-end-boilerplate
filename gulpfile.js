//process.env.DISABLE_NOTIFIER = true; // U&ncomment to disables all notifications

var fileinclude = require('gulp-file-include'), // Include partials
    gulp = require('gulp'), // Gulp
    sass = require('gulp-sass'), // Libsass Pre-processor
    autoprefixer = require('gulp-autoprefixer'), // Autoprefixes CSS using regular CSS
    cssnano = require('gulp-cssnano'), // Minify CSS
    jshint = require('gulp-jshint'), // Lint your JS on the fly
    stylish = require('jshint-stylish'), // Style your jshint results
    uglify = require('gulp-uglify'), // JS minification
    imagemin = require('gulp-imagemin'), // Compress Images
    newer = require('gulp-newer'), // A Gulp plugin for passing through only those source files that are newer than corresponding destination files.
    rename = require('gulp-rename'), // Rename files i.e. in this case rename minified files to .min
    replace = require('gulp-replace'), // A string replace plugin for gulp
    concat = require('gulp-concat'), // Merges all files in to 1
    notify = require('gulp-notify'), // Notifications upon task completion
    sourcemaps = require('gulp-sourcemaps'), // Line numbers pointing to your SCSS files
    svgSprite = require('gulp-svg-sprite'), // takes a bunch of SVG files, optimizes them and bakes them into SVG sprites of several types:
    del = require('del'), // Clean folders of files
    htmlclean = require('gulp-htmlclean'), // Minify HTML
    neat = require('node-neat').includePaths, // The Bourbon Neat grid system
    browserSync = require('browser-sync'), // Live reloading
    scsslint = require('gulp-scss-lint'), // SCSS Linting
    ext_replace = require('gulp-ext-replace'), // Small gulp plugin to change a file's extension
    merge = require('merge-stream'), // Create a stream that emits events from multiple other streams
    reload = browserSync.reload,

    // Default file extension
    fileExt = '.html',

    // File extension 'replace task' variables
    oldExt = '.html',
    newExt = '.php'


// **********************
// *** Required Tasks ***
// **********************

// $ browser-sync - Initialise static Browser Sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./",
        //proxy: 'website-proxy.dev', // Cross device syncing won't work (using ngrok) when proxy enabled
        //port: 58108
        files: '*.css'
    });
});

// $ gulp bs-reload - Browser Sync
gulp.task('bs-reload', function() {
    browserSync.reload();
    return gulp.src('*' + fileExt)
        .pipe(notify({
            message: 'Reload complete',
            onLast: true
        }));
});

// $ gulp sass
gulp.task('sass', function() {
    return gulp.src("./src/styles/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/styles/*.scss'].concat(neat)
        }))
        .on('error', notify.onError(function(error) {
            return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(''))
        .pipe(notify({
            message: 'SASS task complete',
            onLast: true
        }));
});

// $ gulp scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .on('error', notify.onError(function(error) {
            return 'An error occurred while compiling JS.\nLook in the console for details.\n' + error;
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({
            message: 'Scripts task complete',
            onLast: true
        }));
});

// $ gulp fileinclude (Also runs HTML CLean - Simple and safety HTML/SVG cleaner to minify without changing its structure.)
gulp.task('fileinclude', function() {
    gulp.src(['src/components/*' + fileExt, 'src/components/templates/*' + fileExt])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .on('error', notify.onError(function(error) {
            return 'An error occurred while compiling files.\nLook in the console for details.\n' + error;
        }))
        .pipe(htmlclean({
            protect: /<\!--%fooTemplate\b.*?%-->/g,
            edit: function(html) {
                return html.replace(/\begg(s?)\b/ig, 'omelet$1');
            }
        }))
        // Remove underscore filename prefix using regular expression
        .pipe(rename(function(opt) {
            opt.basename = opt.basename.replace(/_/g, '');
            return opt;
        }))
        .pipe(gulp.dest(''))
        .pipe(replace(/_/g, ''))
        .pipe(notify({
            message: 'Include files task complete',
            onLast: true
        }));
});

// $ gulp images - Image compression (Don't forget to use save for web in PS first!)
gulp.task('images', function() {
    return gulp.src('src/images/**/*.{png,jpg,gif,svg}')
        .pipe(newer('dist/assets/img'))
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({
            message: 'Images task complete',
            onLast: true
        }));
});

// $ gulp fonts
gulp.task('fonts', function() {
    browserSync.reload();
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(notify({
            message: 'Fonts task complete',
            onLast: true
        }));
});

// $ gulp watch - This is everything that's being watched when you run the default task
gulp.task('watch', function() {
    gulp.watch('src/components/**/*' + fileExt, ['fileinclude']);
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['scripts'], ['bs-reload']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('*' + fileExt, ['bs-reload']);
});

// $ gulp - Default task
gulp.task('default', ['fileinclude', 'sass', 'scripts', 'images', 'fonts', 'browser-sync', 'watch']);

// **********************
// ***** Misc Tasks *****
// **********************

// $ clean - Emptys everything in the distribution folders and the HTML in the root
gulp.task('clean', function() {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img', '*' + fileExt, 'dist/assets/fonts', 'src/styles/_svg-symbols.scss']);
    return gulp.src("./")
        .pipe(notify({
            message: 'Folders cleaned successfully',
            onLast: true
        }));
});

// $ images-force - Force image compression - will check even if already compressed, useful if files have been renamed
gulp.task('images-force', function() {
    return gulp.src('src/images/**/*.{png,jpg,gif}')
        .pipe(cache.clear())
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({
            message: 'Images task complete',
            onLast: true
        }));
});

// $ replace - Rename suffix e.g. change all *.html files to *.php and then delete original files
var folders = [
    'src/components/',
    'src/components/templates/',
    'src/components/templates/partials/',
    'src/components/templates/partials/components/'
];

var foldersFiles = [
    'src/components/*' + oldExt,
    'src/components/templates/*' + oldExt,
    'src/components/templates/partials/*' + oldExt,
    'src/components/templates/partials/components/*' + oldExt
];

gulp.task('replace', function() {
    var tasks;

    function function1() {
        tasks = folders.map(function(element) {
            return gulp.src(element + '*' + oldExt)
                .pipe(ext_replace(newExt))
                .pipe(gulp.dest(element))
        });
    }

    function function2() {
        return merge(tasks);
    }

    function function3() {
        return del(foldersFiles); // figure out why this aint working
    }

    function1();
    function2();
    function3();
});



// $ svg-sprite - Outputs SVGs to file.
config = {
    "dest": "./dist/assets/img/defs",
    "svg": {
        "xmlDeclaration": false,
        "doctypeDeclaration": false
    },
    "mode": {
        "defs": {
            "dest": "./",
            "sprite": "./sprites.def.svg",
            "bust": true,
            "inline": true,
            "example": true
        }
    }
};

gulp.task('svg-sprite', function() {
    return gulp.src('**/*.svg', { cwd: 'src/images/svgs' })
        .pipe(svgSprite(config)).on('error', function(error) { console.log(error); })
        .pipe(gulp.dest('dist/assets/img/defs'))
});

// $ scss-lint - SCSS Linter
gulp.task('scss-lint', function() {
  return gulp.src(['./src/styles/*/**.scss', '!./src/styles/vendors/*.scss'])
    .pipe(scsslint({
    'reporterOutputFormat': 'Checkstyle',
    'filePipeOutput': 'scssReport.xml',
    'config': 'scss-lint.yml'
  }))
  .pipe(gulp.dest('./reports'))
});