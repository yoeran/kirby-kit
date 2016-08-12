var gulp    = require('gulp');
var config  = require('../config').server;
var connect = require('gulp-connect-php');

global.browserSync = require('browser-sync');

// Static server
gulp.task('connect', function() {
  connect.server(config, function (){
    browserSync({
      proxy: '127.0.0.1:9000',
      notify: {
        styles: {
          top: 'auto',
          bottom: '0'
        }
      }
    });
  });
});
