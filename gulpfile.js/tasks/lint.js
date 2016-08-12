var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var config  = require('../config').jshint;
var eslint  = require('gulp-eslint');

//
// Check yo self before yo wreck yo self
//
gulp.task('lint', function() {
  return gulp.src( config.source )
    .pipe( plumber() )
    .pipe( eslint() )
    .pipe( eslint.format() );
});
