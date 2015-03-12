//
// Compile using SASS, add Autoprefixer and build two versions: normal and minified
//

var gulp          = require('gulp');
var config        = require('../config').styles;
var autoprefixer  = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-minify-css');
var sass          = require('gulp-sass');
var rename        = require('gulp-rename');

function handleError(err) {
  console.log(err.name, ' in ', err.plugin, ': ', err.message);
  this.emit('end');
}

gulp.task('styles', function () {
  return gulp.src( config.source )
    // normal version
    .pipe( sass() ).on('error', handleError)
    .pipe( autoprefixer( config.autoprefixer ) )
    .pipe( gulp.dest( config.dest ) )

    // minified version
    .pipe( rename('main.min.css') )
    .pipe( minifyCSS() )
    .pipe( gulp.dest( config.dest ) );
});
