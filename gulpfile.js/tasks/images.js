var gulp      = require('gulp');
var config    = require('../config').images;
var imagemin  = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');

gulp.task('images', function () {
  return gulp.src( config.source )
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe( gulp.dest( config.dest ) );
});
