# Kirby CMS Starter kit with Gulp
A template to kickstart a new project using Kirby CMS.
Using Gulp for handling SCSS, Javascript and Bower packages.

#### Contents
- Takes Bower packages into account
- Lints and uglifies Javascript
- Compiles and autoprefixes SCSS
- Generates a custom Modernizr build with gulp-modernizr

## Installation
- Download the Kirby CMS and place the contents in the folder named `public/`.
- Add `define('ENV', 'development');` to `public/index.php`
- Refer to CSS and JS files with `<?php echo FTMD::css('main'); ?>` (this would load: assets/styles/main.css in development)

## Todo
- Add a download task to download Kirby CMS' `core` and `panel` into the project. (Could also serve as updater).

## Usage
```bash
  # Build all assets, connect to a PHP server and start watching the files.
  $ gulp
  
  # Deploy all files in `public/` to a specified directory (probably SSH). Uses rsync.
  $ gulp deploy
```

