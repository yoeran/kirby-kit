var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),
    jshint        = require('gulp-jshint'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass'),
    livereload    = require('gulp-livereload')
    usemin        = require('gulp-usemin'),
    rev           = require('gulp-rev'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    wiredep       = require('wiredep');

livereload({
  start: true,
  host: 'localhost'
});

var config = {
  styles: './source/styles/',
  scripts: './source/scripts/',
  vendor_scripts: './source/vendor/*.js',
  vendor_css: './source/vendor/*.css',
  styles_dist: './public/assets/styles/',
  scripts_dist: './public/assets/scripts/'
};

//
// Check yo self before yo wreck yo self
//
gulp.task('lint', function() {
  return gulp.src( config.scripts + '**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//
// Find vendors scripts (bower + vendor dir) and concatenate them into a vendor.js
//
gulp.task('bower', function(){
  // Get Bower dependencies
  var packages  = wiredep(),
      js_files  = packages.js;

  // Add *.js from vendor directory
  js_files.push( config.vendor_scripts );

  return gulp.src( js_files )
    .pipe( concat('vendor.js') )
    .pipe( gulp.dest( config.scripts_dist ) )
    .pipe( rename('vendor.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( config.scripts_dist ) )
    .pipe(livereload());
});

//
// Concatenate all scripts and build two versions: normal and minified
//
gulp.task('scripts', function(){
  return gulp.src( config.scripts + '*.js' )
    // normal version
    .pipe( concat('main.js') )
    .pipe( gulp.dest( config.scripts_dist ) )
    // minified version
    .pipe( rename('main.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( config.scripts_dist ) )
    .pipe(livereload());
});

//
// Compile using SASS, add Autoprefixer and build two versions: normal and minified
//
gulp.task('scss', function () {
  return gulp.src( config.styles + 'main.scss' )
    // normal version
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 5%', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest( config.styles_dist ))
    // minified version
    .pipe( rename('main.min.css') )
    .pipe(minifyCSS())
    .pipe(gulp.dest( config.styles_dist ))
    .pipe(livereload());
});

gulp.task('watch', function(){
  gulp.watch( config.styles + '**/*.scss', ['scss'] );
  gulp.watch( config.scripts + '**/*.js', ['lint','scripts']);
  gulp.watch( './bower.json', ['bower']); // only run the bower task when something has changed, costly operation otherwise
});

gulp.task('build', ['lint','scss','scripts','bower']);
gulp.task('default', ['build','watch']);
