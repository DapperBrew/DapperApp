// ----------------------------------------------------------------------------------------
// Plugins
// ----------------------------------------------------------------------------------------

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var gutil        = require('gulp-util');
var del          = require('del');



// ----------------------------------------------------------------------------------------
// Settings
// ----------------------------------------------------------------------------------------

var src = {
  sass: '../client/scss/**/*.scss',
};

var dest = {
  css: '../client/stylesheets',
};

var name = {
  css: 'app.min.css',
};

// ----------------------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------------------

// Task: Sass
gulp.task('sass', function() {
  return gulp.src(src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css))
});

// Task: Watch
gulp.task('watch', ['sass'], function() {
  gulp.watch(src.sass, ['sass']);
});


// Task: Clean Up
// gulp.task('clean', function () {
//   del([
//     'dist/js/*',
//     'dist/fonts/*',
//     'dist/css/*',
//     'dist/*.html'
//   ]);
// });

// Task: Build
gulp.task('build', ['clean', 'sass'], function(){});

// Task: Default (launch server and watch files for changes)
gulp.task('default', ['watch'], function(){});