var gulp    = require('gulp');
var config  = require('../config').javascript;
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

//
// Check yo self before yo wreck yo self
//
gulp.task('lint', function() {
  return gulp.src( config.source )
    .pipe( jshint() )
    .pipe( jshint.reporter(stylish) );
});
