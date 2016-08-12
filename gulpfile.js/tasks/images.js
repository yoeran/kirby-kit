var gulp      = require('gulp');
var config    = require('../config').images;
var imagemin  = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');
var webp      = require('gulp-webp');

gulp.task('images:optimize', function () {
  return gulp.src( config.source )
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe( gulp.dest( config.dest ) );
});

gulp.task('images:webp', function () {
  return gulp.src( config.source )
    .pipe( webp({
      preset: 'photo',
      quality: 90,
      method: 6
    }) )
    .pipe( gulp.dest(config.dest) );
});

gulp.task('images', ['images:optimize','images:webp']);
