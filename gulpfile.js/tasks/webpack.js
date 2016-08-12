var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var config  = require('../config').webpack;
var webpack = require('webpack-stream');

var webpackConfig = require('../../webpack.config.js');

gulp.task('webpack:once', function () {
  webpackConfig.watch = false;

  return gulp.src( config.source )
    .pipe( plumber() )
    .pipe( webpack( webpackConfig ) )
    .pipe( gulp.dest( config.dest ) );
});

gulp.task('webpack:watch', function () {
  webpackConfig.watch   = true;
  webpackConfig.devtool = 'source-map';

  return gulp.src( config.source )
    .pipe( plumber() )
    .pipe( webpack( webpackConfig ) )
    .pipe( gulp.dest( config.dest ) );
});
