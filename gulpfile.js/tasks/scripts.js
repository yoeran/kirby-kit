var gulp    = require('gulp');
var config  = require('../config').javascript;
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');

//
// Concatenate all scripts and build two versions: normal and minified
//
gulp.task('scripts', function(){
  return gulp.src( config.source )
    // normal version
    .pipe( concat( config.name + '.js') )
    .pipe( gulp.dest( config.dest ) )
    // minified version
    .pipe( rename( config.name + '.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( config.dest ) );
});
