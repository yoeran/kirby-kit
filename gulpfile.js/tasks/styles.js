//
// Compile using SASS, add Autoprefixer and build two versions: normal and minified
//

var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var config        = require('../config').styles;
var autoprefixer  = require('gulp-autoprefixer');
var cleanCSS      = require('gulp-clean-css');
var sass          = require('gulp-sass');
var rename        = require('gulp-rename');

function handleError(err) {
  console.log(err.name, ' in ', err.plugin, ': ', err.message);
  this.emit('end');
}

gulp.task('styles', function () {
  return gulp.src( config.source )
    .pipe ( plumber() )

    // normal version
    .pipe( sass() ).on('error', handleError)
    .pipe( autoprefixer( config.autoprefixer ) )
    .pipe( gulp.dest( config.dest ) )
    .pipe( browserSync.stream() )

    // minified version
    .pipe( rename('main.min.css') )
    .pipe( cleanCSS() )
    .pipe( gulp.dest( config.dest ) );
});
