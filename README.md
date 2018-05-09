# Gulp/Webpack workflow set up and usage guide

  

This guide will explain how to set up and use the Gulp/Webpack Front End Boilerplate

  

## Initial set-up

  

<!-- 1. To get linting working with Gulp, you first need Ruby installed, and then the following 2 gems:

`$ gem install scss_lint scss_lint_reporter_checkstyle` -->

  

1. Download and install the latest stable version of [NodeJS](https://nodejs.org/en/download/), and [Git](https://git-scm.com/downloads).

  

1. Install gulp and gulp-cli globally using the following command:

`$ npm i gulp gulp-cli -g`

(install these separately if experiencing issues)

  

## Usage

  

To build all files and create a local server, run the command `$ npm start dev`. Do this in the same folder as your gulpfile.babel.js. This is the default task that will run all the other tasks, including launching browser sync, and watching files for changes.


  

### Folder Structure

The folder structure is defined inside config/config.js. This can be modified to suit any environment. For example you could modify the distribution folders so that they consistent with an Umbraco folder structure.

If you're working with any files other than HTML, then inside config.js you'll need to update the `fileExt` variable.  

## Production deployment

Don't forget to run these before sending the final build off to QA and/or production.

  

*  **The production flag** Run Gulp using the `--production` flag, this will - Minify CSS, Uglify JS, and Strip out all JS alert and console logs. Running this will allow you to work as normal, the major difference is that the Scripts tasks will take longer to compile.

## Primary Functions
Below is a a brief description of each function, some of which may need to reconfiguring on a project per project basis.

### Browser Sync
**File**: server.js
**Function name**: `bs`  
**Default behaviour**: Launches a local development server and watches for changes to HTML and CSS. HTML is injected to the DOM when a change is made*. CSS is also injected.
**Live HTML injection doesn't work when working with multiple pages, but will always at least fallback to page reload.*
**Additional info**: You can configure browser sync to run through a proxy. To do this, inside server.js - Remove the `server` line, add a property for `proxy`, and update this value with the appropiate URL


*  `$ styles` -

* You may need to edit the specificity of supported browsers for the Autoprefixer plugin. Leaving this blank doesn't mean all browsers are supported, so by default it has been configured to the last 2 versions, and IE6 - IE10. You can find a full list of options here - https://github.com/postcss/autoprefixer#options Or if you want to target based on usage data - https://github.com/ai/browserslist#custom-usage-data.

* If you have heavily nested styles, then it may be beneficial to disable autoprefixer, as autoprefixer prevents sourcemaps from reference exact line numbers references the top level parent instead)

*  `images` - The image optimisation level is set to 7 by default. This shouldn't need to be changed. You can experiment with the quality setting for the pngQuant plugin, but it's recommended to leave it as it is.

  

## Additional tasks

  

Here are a few additonal tasks that may benefit your development process

  

*  `npm run critical` - This will inline "above the fold" CSS in to the head of your document. The CSS path(s) can be modified inside the config file, it accepts arrays for multiple stylesheets. This must be . For further help and configuration, refer to the documentation at https://github.com/addyosmani/critical

*  `$ npm run clean` - Deletes all the distribution files and folders

*  `$ npm run scss-lint` - Checks SCSS for errors and warns of any bad practices - This requires ruby and SCSS Lint. Run `$ gem install scss_lint scss_lint_reporter_checkstyle` to install the required files. Lint reports are saved in the 'reports' folder

  
  
  

## Configuration

  

*  **Notifications** - By default, notifications only show when there's an error. If you'd like to completely disable notifications you can do so by setting the 'notifications' variable in your 'gulpfile.js' to false

*  **.jshintignore** - By default, this ignores \*.js files in the root of the 'scripts' folder, this is to prevent endless Lint warnings from vendor plugins

*  **.jshintsrc** - You may want to add properties to the `globals` object if you're using vendor plugins. This will prevent undefined variable warning messages.

  

## Cross device browser synchronisation

  

This isn't required locally, but due to nearly all our ports being blocked, if you'd like the cross-browser functionality remotely, you'll need to use a tool called **ngrok**. Currently this only works with static HTML files. WordPress builds may be possible too, but it's probably more hassle than it's worth to attempt to get it working, considering all the cross device testing is usually done during the front end phase of a build.

  

1. Register on https://ngrok.com/

1. Download ngrok and add the executable to your working directory

1. Run the following command with your auth token, which you can found on the dashboard once logged in to the website - `$ ngrok authtoken .yourAuthToken`

1. Run the command `$ ngrok http -region=eu 3000` inside your working directory. In this case, 3000 is the port number assigned by browserSync.

1. Use the web address provided within the terminal window to access your build anywhere you like

  

## Updating packages

  

You can update packages with the `$ ncu -u` command, or just `$ ncu` to check the current and most recent version. Please refer to this for my information: https://www.npmjs.com/package/npm-check-updates
