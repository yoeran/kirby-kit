var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var config    = require('../config').modernizr;
var modernizr = require('gulp-modernizr');
var uglify    = require('gulp-uglify');
var changed   = require('gulp-changed');

gulp.task('modernizr', function() {
  return gulp.src( config.source )
    .pipe( plumber() )
    .pipe( changed( config.dest) )
    .pipe( modernizr( config.parameters ) )
    .pipe( uglify() )
    .pipe( gulp.dest( config.dest ) );
});
