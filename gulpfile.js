var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),
    jshint        = require('gulp-jshint'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass'),
    livereload    = require('gulp-livereload')
    usemin        = require('gulp-usemin'),
    rev           = require('gulp-rev'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    wiredep       = require('wiredep');

livereload({
  start: true,
  host: 'localhost'
});

var config = {
  styles: './source/styles/',
  scripts: './source/scripts/',
  styles_dist: './public/assets/styles/',
  scripts_dist: './public/assets/scripts/'
};

gulp.task('lint', function() {
  return gulp.src( config.scripts + '**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bower', function(){
  var packages = wiredep();
  return gulp.src( packages.js )
    .pipe( concat('vendor.js') )
    .pipe( gulp.dest( config.scripts_dist ) )
    .pipe( rename('vendor.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( config.scripts_dist ) )
    .pipe(livereload());
});

gulp.task('scripts', function(){
  return gulp.src( config.scripts + '*.js' )
    .pipe( concat('main.js') )
    .pipe( gulp.dest( config.scripts_dist ) )
    .pipe( rename('main.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( config.scripts_dist ) )
    .pipe(livereload());
});

gulp.task('scss', function () {
  return gulp.src( config.styles + 'main.scss' )
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 5%', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest( config.styles_dist ))
    .pipe( rename('main.min.css') )
    .pipe(minifyCSS())
    .pipe(gulp.dest( config.styles_dist ))
    .pipe(livereload());
});

gulp.task('watch', function(){
  gulp.watch( config.styles + '**/*.scss', ['scss'] );
  gulp.watch( config.scripts + '**/*.js', ['lint','scripts']);
  gulp.watch( './bower.json', ['bower']);
});

gulp.task('build', ['lint','scss','scripts','bower']);
gulp.task('serve', ['build','watch']);
gulp.task('default', ['build']);
