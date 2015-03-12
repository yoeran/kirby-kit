//
// Find vendors scripts (bower + vendor dir) and concatenate them into a vendor.js
//

var gulp    = require('gulp');
var config  = require('../config').wiredep;
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var wiredep = require('wiredep');

gulp.task('wiredep', function(){
  // Get Bower dependencies
  var packages  = wiredep(),
      js_files  = packages.js;

  // Add *.js from vendor directory
  js_files.push( config.source );

  return gulp.src( js_files )
    .pipe( concat('vendor.js') )
    .pipe( gulp.dest( config.dest ) )
    .pipe( rename('vendor.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( config.dest ) );
});
