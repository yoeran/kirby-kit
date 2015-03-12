var gulp = require('gulp');

gulp.task('build', ['lint','images','styles','scripts','modernizr']);
gulp.task('default', ['build','watch','connect']);
