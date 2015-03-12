var gulp      = require('gulp');
var config    = require('../config').modernizr;
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src( config.source )
    .pipe( modernizr( config.parameters ) )
    .pipe( gulp.dest( config.dest ) );
});
