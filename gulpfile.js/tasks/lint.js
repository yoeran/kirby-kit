var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var config  = require('../config').jshint;
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

//
// Check yo self before yo wreck yo self
//
gulp.task('lint', function() {
  return gulp.src( config.source )
    .pipe( plumber() )
    .pipe( jshint() )
    .pipe( jshint.reporter(stylish) );
});
