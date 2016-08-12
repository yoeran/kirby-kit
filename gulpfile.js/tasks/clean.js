var gulp      = require('gulp');
var del       = require('del');
var config    = require('../config').clean;

/* Clean the public directory */
gulp.task('clean', function () {
  return del(config.all);
});
