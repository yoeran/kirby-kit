var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),
    jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass'),
    livereload    = require('gulp-livereload')
    usemin        = require('gulp-usemin'),
    rev           = require('gulp-rev'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    exec          = require('child_process').exec,
    wiredep       = require('wiredep')
    connect       = require('gulp-connect-php');

var DEPLOY_TO = 'user@domain.com:/path/to/deploy';

var paths = {
  styles:         './source/styles/',
  scripts:        './source/scripts/',
  vendor_scripts: './source/vendor/*.js',
  vendor_css:     './source/vendor/*.css',
  assets_dist:    './public/assets/',
  styles_dist:    './public/assets/styles/',
  scripts_dist:   './public/assets/scripts/'
};

//
// Catch, halt, fire!
//
function handleError(err) {
  console.log(err.name, ' in ', err.plugin, ': ', err.message);
  this.emit('end');
}

//
// Check yo self before yo wreck yo self
//
gulp.task('lint', function() {
  return gulp.src( paths.scripts + '**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//
// Find vendors scripts (bower + vendor dir) and concatenate them into a vendor.js
//
gulp.task('bower', function(){
  // Get Bower dependencies
  var packages  = wiredep(),
      js_files  = packages.js;

  // Add *.js from vendor directory
  js_files.push( paths.vendor_scripts );

  return gulp.src( js_files )
    .pipe( concat('vendor.js') )
    .pipe( gulp.dest( paths.scripts_dist ) )
    .pipe( rename('vendor.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( paths.scripts_dist ) );
});

//
// Concatenate all scripts and build two versions: normal and minified
//
gulp.task('scripts', function(){
  return gulp.src( paths.scripts + '*.js' )
    // normal version
    .pipe( concat('main.js') )
    .pipe( gulp.dest( paths.scripts_dist ) )
    // minified version
    .pipe( rename('main.min.js') )
    .pipe( uglify() )
    .pipe( gulp.dest( paths.scripts_dist ) );
});

//
// Compile using SASS, add Autoprefixer and build two versions: normal and minified
//
gulp.task('scss', function () {
  return gulp.src( paths.styles + 'main.scss' )
    // normal version
    .pipe(sass()).on('error', handleError)
    .pipe(autoprefixer({
      browsers: ['> 5%', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest( paths.styles_dist ))
    // minified version
    .pipe( rename('main.min.css') )
    .pipe(minifyCSS())
    .pipe(gulp.dest( paths.styles_dist ));
});


gulp.task('connect', function() {
  connect.server({
    open: true,
    port: 9000,
    hostname: '0.0.0.0',
    base: './public',
    keepalive: true,
    livereload: true
  });
});

//TODO: Move URL options to package.json
gulp.task('deploy', function (cb) {
  exec("rsync -rtvzh --progress --del --exclude-from 'rsync-exclude.txt' public/ "+DEPLOY_TO, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('watch', function(){
  livereload.listen();

  gulp.watch( './public/**/*.{css,js,html,php}').on('change', livereload.changed);

  // build tasks
  gulp.watch( paths.styles + '**/*.scss', ['scss'] );
  gulp.watch( paths.scripts + '**/*.js', ['lint','scripts']);
  gulp.watch( './bower.json', ['bower']); // only run the bower task when something has changed, costly operation otherwise
});

gulp.task('build', ['lint','scss','scripts','bower']);
gulp.task('default', ['connect','watch']);
