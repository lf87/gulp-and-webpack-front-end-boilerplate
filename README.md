# Gulp/Webpack workflow set up and usage guide

This guide will explain how to set up and use the Gulp/Webpack Front End Boilerplate.

  - [Initial set-up](#initial-set-up)
  - [Configuration](#configuration)
  - [Primary Functions](#primary-functions)
    - [Browser Sync](#browser-sync)
    - [Browser Sync Reload](#browser-sync-reload)
    - [SASS Compiling](#sass-compiling)
    - [Clean Production](#clean-production)
    - [Duplicate Files](#duplicate-files)
    - [Duplicate Production Files](#duplicate-production-files)
    - [Fonts Compressions](#fonts-compressions)
    - [JPG and GIF Compression](#jpg-and-gif-compression)
    - [PNG Compression](#png-compression)
    - [SVG Compression](#svg-compression)
    - [Nunjucks Pages](#nunjucks-pages)
    - [Nunjucks Templates](#nunjucks-templates)
    - [Watch](#watch)
    - [Webpack](#webpack)
  - [Primary Tasks](#primary-tasks)
    - [Development](#development)
    - [Production](#production)
    - [Build](#build)
  - [Additional Tasks](#additional-tasks)
    - [Critical CSS](#critical-css)
    - [SCSS Lint](#scss-lint)
    - [Clean](#clean)
  - [Updating packages](#updating-packages)

&nbsp;
&nbsp;

## Initial set-up
1. Download and install the latest stable version of [NodeJS](https://nodejs.org/en/download/), and [Git](https://git-scm.com/downloads).
2. Install gulp and gulp-cli globally using the following commands:
3. CD into project folder
4. Install ruby + gem for scss linting
5. Install npm packages

`$ npm i gulp -g`

`$ npm i gulp-cli -g`

`$ gem install scss_lint scss_lint_reporter_checkstyle`

`$ npm i`

&nbsp;
&nbsp;

## Configuration

* **Files and Folders** - The folder structure is defined inside 'config/config.js'. Edit this file to suit your environment. If you're working with any files other than HTML, then you'll need to update the `fileExt` variable.

- **Notifications** - Notifications only show when there's an error. If you'd like to completely disable notifications you can do so by setting the 'notifications' variable in your 'gulpfile.js' to false.

* **.eslintignore** - Set to ignore the distribution folder and node_modules folder, but it may be necessary to add an exclusion for any vendor scripts not added through NPM.

- **.eslintrc** - Completely configurable, meaning you can turn off every rule and run only with basic syntax validation, or mix and match the bundled rules and your custom rules to make ESLint perfect for your project.

* **gulpfile.babel** - Use this file to define new tasks.

- **.babelrc** - The preset 'env' allows you to specify which browsers babel should target when transpiling. The plugin 'transform-strict-mode' places a "use strict"; directive at the top of all files to enable strict mode.

- **webpack.dev.config.js** - This is a basic webpack configuration, it includes the eslint module for syntax validation, the babel transpiler, and sourcemaps for your JS.

- **webpack.prod.config.js** - Running in production mode will trigger this config file, code uglification and minifying runs by default in this mode. It includes the workbox plugin for generating yourself a PWA - additional config is likely required to get this working effectively.

&nbsp;
&nbsp;

## Primary Functions

Below is a brief description of each function, all of which can be reconfigured on a project per project basis. For further information please see the package documentation.

### Browser Sync

**Function name**: `bs`

**Default behaviour**: Launches a local development server and watches for changes to HTML and CSS. HTML is injected to the DOM when a change is made. CSS is also injected.

**Additional info**: You can configure browser sync to run through a proxy. To do this, inside server.js - Remove the `server` line, add a property for `proxy`, and update this value with the appropriate URL.

### Browser Sync Reload

**Function name**: `bsReload`

**Default behaviour**: This triggers a page reload, it's triggered as a callback after certain other functions are complete.

### SASS Compiling

**Function name**: `sass`

**Default behaviour**: This compiles your SASS to CSS. it will add source maps to your stylesheet. and auto prefix all your styles.

**Production behaviour**: Running in production mode will exclude source maps and minify/clean your CSS.

### Clean Production

**Function name**: `cleanProd`

**Default behaviour**: Cleans all your production files and folders. This will run automatically before running the 'build' task.

### Duplicate Files

**Function name**: `duplicateFiles`

**Default behaviour**: Duplicates any files/folders located in the src/static directory in to the distribution folder.

### Duplicate Production Files

**Function name**: `duplicateProdFiles`

**Default behaviour**: Duplicates any files/folders located in the distribution directory in to the production folder. This function runs when the 'build' task is run.

### Fonts Compressions

**Function name**: `fonts`

**Default behaviour**: Compresses and minifies fonts.

### JPG and GIF Compression

**Function name**: `images`

**Default behaviour**: Compresses images. Make sure to save for web in PS first.

### PNG Compression

**Function name**: `imagesPng`

**Default behaviour**: Compresses PNG's using a compression algorithm similar to TinyPNG's. Save for web in PS first.

### SVG Compression

**Function name**: `svgs`

**Default behaviour**: Strips out unnecessary meta data, minifies, and compresses SVG code.

### Nunjucks Pages

**Function name**: `nunjucksPages`

**Default behaviour**: This converts your template code in to HTML. It uses the Nunjucks templating framework language for JavaScript. See docs or the examples (very basic) included for information on how to use. By default, it accepts a JSON file, where you can store all your content.

**Additional Info**: It's not configured by default to accept multiple JSON files.

### Nunjucks Templates

**Function name**: `nunjucksTemplates`

**Default behaviour**: Same as above, except this function is just for the partial files. The only difference is that it doesn't have caching, so is a little bit slower as it will run x amount of times for the number of files existing inside 'src/pages' (For more info see [this Stack Overflow Question](https://stackoverflow.com/questions/49233603/detect-changes-between-multiple-source-files-using-gulp)).

### Watch

**Function name**: `watch`

**Default behaviour**: Waits for activity inside the specified folders and will run the relevant functions once a change has been detected.

### Webpack

**Function name**: `webpack`

**Default behaviour**: This is simply a Gulp wrapper to determine where your webpack config file is located.

**production behaviour**: Running in production mode will use an alternative webpack config file.

&nbsp;
&nbsp;

## Primary Tasks

### Development

**Function name**: `dev`

**Command**: npm run dev

**Default behaviour**: builds all files and create a local server. This is the default task that will run all the other tasks, including launching browser sync, and watching files for changes.

### Production

**Function name**: `prod`

**Command**: npm run prod

**Default behaviour**: Exactly the same as above but allows you to work in production mode

### Build

**Function name**: `build`

**Command**: npm run build

**Default behaviour**: Generates your production ready files in to the 'production' folder

&nbsp;
&nbsp;

## Additional Tasks

### Critical CSS

**Function name**: `criticalCss`

**Task name**: `critical-css`

**Command**: npm run critical

**Default behaviour**: This will launch Chromium and determine which styles are "above the fold" for all pages specified, and inline those styles to the head of your page. By default it will run against all HTML files inside the production folder.

**Additional Notes**: Make sure you run this on the production files, not on the distributed files.

### SCSS Lint

**Function name**: `scssLint`

**Task name**: `scss-lint`

**Command**: npm run scss-lint

**Default behaviour**: Checks SCSS for errors and warns of any bad practices - This requires ruby. Run `$ gem install scss_lint scss_lint_reporter_checkstyle` to install the required files. The default location for lint reports is at the gulpfile root level inside '/reports'

### Clean

**Function name**: `clean`

**Task name**: `clean`

**Command**: `clean`

**Default behaviour**: Cleans all your distribution files and folders.

**Additional Notes**: If modifying this function, be careful not to delete your source files!

&nbsp;
&nbsp;

## Updating packages

You can update packages with the `$ ncu -u` command, or just `$ ncu` to check the current and most recent version. Please refer to this for my information: https://www.npmjs.com/package/npm-check-updates
