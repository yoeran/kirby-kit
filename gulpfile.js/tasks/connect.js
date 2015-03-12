var gulp    = require('gulp');
var config  = require('../config').server;
var connect = require('gulp-connect-php');

gulp.task('connect', function() {
  connect.server(config);
});
