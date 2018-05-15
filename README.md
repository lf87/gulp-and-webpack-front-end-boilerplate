# Gulp/Webpack workflow set up and usage guide

This guide will explain how to set up and use the Gulp/Webpack Front End Boilerplate

## Initial set-up

<!-- 1. To get linting working with Gulp, you first need Ruby installed, and then the following 2 gems:

`$ gem install scss_lint scss_lint_reporter_checkstyle` -->

1.Download and install the latest stable version of [NodeJS](https://nodejs.org/en/download/), and [Git](https://git-scm.com/downloads).

1)Install gulp and gulp-cli globally using the following commands:

`$ npm i gulp -g`
`$ npm i gulp-cli -g`

## Usage

To build all files and create a local server, run the command `$ npm start dev`. Do this in the same folder as your gulpfile.babel.js. This is the default task that will run all the other tasks, including launching browser sync, and watching files for changes.

### Folder Structure

The folder structure is defined inside config/config.js. This can be modified to suit any environment. For example you could modify the distribution folders so that they consistent with an Umbraco folder structure.

If you're working with any files other than HTML, then inside config.js you'll need to update the `fileExt` variable.

## Production deployment

Don't forget to run these before sending the final build off to QA and/or production.

* **The production flag** Run Gulp using the `--production` flag, this will - Minify CSS, Uglify JS, and Strip out all JS alert and console logs. Running this will allow you to work as normal, the major difference is that the Scripts tasks will take longer to compile.

## Primary Functions

Below is a brief description of each function, all of which can be reconfigured on a project per project basis. For information please see the package documentation

### Browser Sync

**File**: server.js
**Function name**: `bs`
**Default behaviour**: Launches a local development server and watches for changes to HTML and CSS. HTML is injected to the DOM when a change is made*. CSS is also injected.
\*\*Live HTML injection doesn't work when working with multiple pages, but will always at least fallback to page reload.*
**Additional info**: You can configure browser sync to run through a proxy. To do this, inside server.js - Remove the `server` line, add a property for `proxy`, and update this value with the appropiate URL.

### Browser Sync Reload

**File**: server.js
**Function name**: `bsReload`
**Default behaviour**: This triggers a page reload, it's triggered as a callback after certain other functions are complete.

### SASS Compiling

**File**: styles.js
**Function name**: `sass`
**Default behaviour**: This compiles your SASS to CSS. it will add sourcemaps to your stylesheet. and autoprefix all your styles.
**Production behaviour**: Running in production mode will exclude sourcemaps and minify/clean your CSS.
**Additional info**: SASS globbing is included, so you can includes directories with patterns such as `*/**`.

### Clean Production

**File**: clean.js
**Function name**: `cleanProd`
**Default behaviour**: Cleans all your production files and folders. This will run automatically before running the 'build' task.

### Duplicate Files

**File**: duplicate-files.js
**Function name**: `duplicateFiles`
**Default behaviour**: Duplicates any files/folders located in the src/static directory in to the distribution folder.

### Duplicate Production Files

**File**: duplicate-files.js
**Function name**: `duplicateProdFiles`
**Default behaviour**: Duplicates any files/folders located in the distribution directory in to the production folder. This function runs when the 'build' task is run.

### Fonts Compressions

**File**: fonts.js
**Function name**: `fonts`
**Default behaviour**: Compresses and minifies fonts.

### JPG and GIF Compression

**File**: images.js
**Function name**: `images`
**Default behaviour**: Compresses images. Make sure to save for web in PS first.

### PNG Compression

**File**: images.js
**Function name**: `imagesPng`
**Default behaviour**: Compresses PNG's using a compression algorithm similar to TinyPNG's. Save for web in PS first.

### SVG Compression

**File**: images.js
**Function name**: `svgs`
**Default behaviour**: Strips out unnecessary meta data, minifies, and compresses SVG code.

### Nunjucks Pages

**File**: templating.js
**Function name**: `nunjucksPages`
**Default behaviour**: This processes all your HTML template code and converts to static HTML. It uses the Nnunjucks templating framework language for javascript. See docs or the examples (very basic) included for information on how to use. By default it accepts a JSON file, where you can place all your content.
**Additional Info**: It's not configured by default to accept multiple JSON files

**File**: templating.js
**Function name**: `nunjucksTemplates`
**Default behaviour**: Same as above, except this function is just for the partial files. The only difference is that it doesn't have caching, so is a little bit slower as it will run x amount of times for the number of files existing inside 'src/pages' (For more info see [this Stack Overflow Question](https://stackoverflow.com/questions/49233603/detect-changes-between-multiple-source-files-using-gulp)).

### Watch
**File**: watch.js
**Function name**: `watch`
**Default behaviour**: Waits for activity inside the specified folders and will run the relevent functions once a change has been detected.

### Webpack
**File**: webpack.js
**Function name**: `webpack`
**Default behaviour**: This is simply a Gulp wrapper to determine where your webpack config file is located
**production behaviour**: Running in production mode will use an alternative webpack config file



## Primary Tasks

Here are a few additonal tasks that may benefit your development process

### Development

**Function name**: `dev`
**Command**: npm run dev
**Default behaviour**: xxxxxxx

### Production

**Function name**: `prod`
**Command**: npm run prod
**Default behaviour**: xxxxxxx

### Build

**Function name**: `build`
**Command**: npm run build
**Default behaviour**: xxxxxxx

## Additional  Tasks

### Critical CSS

**File**: styles.js
**Function name**: `criticalCss`
**Task name**: `critical-css`
**Command**: npm run critical
**Default behaviour**: This will launch Chromium and determine which styles are "above the fold" for all pages specified, and inline those styles to the head of your page. By default it will run against all HTML files inside the production folder.
**Additional Notes**: Make sure you run this on the production files, not on the distribution files, and if running more than once that the style tag hasn't been added multiple times (although the clean task should take care of that).

### SCSS Lint

**File**: styles.js
**Function name**: `scssLint`
**Task name**: `scss-lint`
**Command**: npm run scss-lint
**Default behaviour**: Checks SCSS for errors and warns of any bad practices - This requires ruby and SCSS Lint. Run `$ gem install scss_lint scss_lint_reporter_checkstyle` to install the required files. The default location for lint reports is at the gulpfile root level inside '/reports'

### Clean

**File**: clean.js
**Function name**: `clean`
**Task name**: `clean`
**Command**: `clean`
**Default behaviour**: Cleans all your distribution files and folders.
**Additional Notes**: If modifying this function, be careful not to delete your source files!



* `$ styles` -

* You may need to edit the specificity of supported browsers for the Autoprefixer plugin. Leaving this blank doesn't mean all browsers are supported, so by default it has been configured to the last 2 versions, and IE6 - IE10. You can find a full list of options here - https://github.com/postcss/autoprefixer#options Or if you want to target based on usage data - https://github.com/ai/browserslist#custom-usage-data.

* If you have heavily nested styles, then it may be beneficial to disable autoprefixer, as autoprefixer prevents sourcemaps from reference exact line numbers references the top level parent instead)

* `images` - The image optimisation level is set to 7 by default. This shouldn't need to be changed. You can experiment with the quality setting for the pngQuant plugin, but it's recommended to leave it as it is.

## Additional tasks

* `$ npm run clean` - Deletes all the distribution files and folders

* `$ npm run scss-lint` - Checks SCSS for errors and warns of any bad practices - This requires ruby and SCSS Lint. Run `$ gem install scss_lint scss_lint_reporter_checkstyle` to install the required files. Lint reports are saved in the 'reports' folder

## Configuration

* **Notifications** - By default, notifications only show when there's an error. If you'd like to completely disable notifications you can do so by setting the 'notifications' variable in your 'gulpfile.js' to false

* **.jshintignore** - By default, this ignores \*.js files in the root of the 'scripts' folder, this is to prevent endless Lint warnings from vendor plugins

* **.jshintsrc** - You may want to add properties to the `globals` object if you're using vendor plugins. This will prevent undefined variable warning messages.

## Cross device browser synchronisation

This isn't required locally, but due to nearly all our ports being blocked, if you'd like the cross-browser functionality remotely, you'll need to use a tool called **ngrok**. Currently this only works with static HTML files. WordPress builds may be possible too, but it's probably more hassle than it's worth to attempt to get it working, considering all the cross device testing is usually done during the front end phase of a build.

1.Register on https://ngrok.com/

1.Download ngrok and add the executable to your working directory

1.Run the following command with your auth token, which you can found on the dashboard once logged in to the website - `$ ngrok authtoken .yourAuthToken`

1.Run the command `$ ngrok http -region=eu 3000` inside your working directory. In this case, 3000 is the port number assigned by browserSync.

1.Use the web address provided within the terminal window to access your build anywhere you like

## Updating packages

You can update packages with the `$ ncu -u` command, or just `$ ncu` to check the current and most recent version. Please refer to this for my information: https://www.npmjs.com/package/npm-check-updates
