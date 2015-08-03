# Kirby CMS Starter kit with Gulp
A template to kickstart a new project using Kirby CMS.
Using Gulp for handling SCSS, Javascript and Bower packages.

#### Contents
- Takes Bower packages into account
- Lints and uglifies Javascript
- Compiles and autoprefixes SCSS
- Generates a custom Modernizr build with gulp-modernizr

## Installation
Rename the `config.example.js` file to `config.js` and adjust settings if needed. After that run `gulp kirby:download` to download the necessary kirby files.

## Usage
```bash
  # Download the Kirby core and panel from their github repository
  $ gulp kirby:download

  # Build all assets, connect to a PHP server and start watching the files.
  $ gulp serve
  
  # Deploy all files in `public/` to a specified directory (probably SSH). Uses rsync.
  $ gulp deploy
```

## Todo
- Add CLI help manual with `gulp-help`
- Add kirby:prepare task to build kirby folders in `public/`
