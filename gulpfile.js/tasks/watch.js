var gulp        = require('gulp');
var config      = require('../config');
var watch       = require('gulp-watch');

var modernizrConfig = config.modernizr;
var watchConfig     = config.watch;

gulp.task('watch', function(){
  watch( watchConfig.styles, function() {
    gulp.start('styles');
  });

  watch( modernizrConfig.source, function () {
    gulp.start('modernizr');
  });

  watch( watchConfig.images, function() {
    gulp.start('images');
  });

  watch( watchConfig.livereload, browserSync.reload);
});
