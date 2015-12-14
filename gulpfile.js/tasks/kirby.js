var gulp      = require('gulp');
var download  = require('gulp-download');
var unzip     = require('gulp-unzip');
var rename    = require('gulp-rename');
var del       = require('del');
var runSequence = require('run-sequence');
var config    = require('../config').kirby;

var coreTemp  = './tmp/kirby-core';
var panelTemp = './tmp/kirby-panel';

gulp.task('kirby:download', ['kirby:core', 'kirby:panel']);

gulp.task('kirby:core', function(callback) {
  runner('core', callback);
});

gulp.task('kirby:panel', function(callback) {
  runner('panel', callback);
});

function runner(type, cb) {
  runSequence(
    'kirby:'+type+':download',
    'kirby:'+type+':clear_public',
    'kirby:'+type+':move',
    'kirby:'+type+':clear_tmp',
    cb
  );
}

/**
 * Install/update Kirby Core
 */
gulp.task('kirby:core:download', function(){
  return download( config.core.url )
    .pipe( unzip() )
    .pipe( gulp.dest( coreTemp ) );
});

gulp.task('kirby:core:clear_public', function(cb){
  return del(config.core.path );
});

gulp.task('kirby:core:move', function(){
  console.log('move core');
  return gulp.src( coreTemp + '/kirby-master/*')
    .pipe( gulp.dest( config.core.path ) );
});

gulp.task('kirby:core:clear_tmp', function(cb){
  return del(coreTemp );
});

/**
 * Install/update Kirby Core
 */
gulp.task('kirby:panel:download', function(){
  return download( config.panel.url )
    .pipe( unzip() )
    .pipe( gulp.dest( panelTemp ) );
});

gulp.task('kirby:panel:clear_public', function(cb){
  return del(config.panel.path);
});

gulp.task('kirby:panel:move', function(){
  console.log('move panel');
  return gulp.src(panelTemp + '/panel-master/*')
    .pipe( gulp.dest( config.panel.path ) );
});

gulp.task('kirby:panel:clear_tmp', function(cb){
  return del(panelTemp);
});
