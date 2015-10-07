// ----------------------------------------------------------------------------------------
// Plugins
// ----------------------------------------------------------------------------------------

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var gutil        = require('gulp-util');
var del          = require('del');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var reactify     = require('reactify');
var babelify     = require('babelify');



// ----------------------------------------------------------------------------------------
// Settings
// ----------------------------------------------------------------------------------------

// concat with gulp (not browserify). Goes in header.

var vendorjs = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/jquery-throttle-debounce/jquery.ba-throttle-debounce.js'
];

var headerjs = [
  'bower_components/modernizr/modernizr.js'
];

var appjs = [
  'app/js/modules/*.js'
];

var src = {
  sass: 'app/scss/**/*.scss',
  vendor: vendorjs,
  header: headerjs,
  //alljs: 'app/js/**/*.js',
  app: appjs, 
  img: 'app/images/*',
  html: 'app/*.html'
};

var dist = {
  css: 'dist/css',
  js: 'dist/js',
  vendor: 'dist/js',
  header: 'dist/js',
  app: 'dist/js',
  img: 'dist/img',
  html: 'dist',
};

var name = {
  css: 'app.min.css',
  vendor: 'vendor.min.js',
  header: 'header.min.js',
  app: 'app.min.js',
}

// ----------------------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------------------


// TESTING

gulp.task('test', function () {
  browserify({
    entries: 'app/js/test.js',
    //extensions: ['.jsx'],
    transform: [babelify],
    debug: true
  })
  .bundle()
  .pipe(source('test-app.js'))
  .pipe(gulp.dest(dist.js));
});

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['app/js/test.js'], // Only need initial file, browserify finds the deps
    transform: [reactify, babelify], // We want to convert JSX to normal javascript
    debug: true, // Gives us sourcemapping
  })
    .bundle()
    .pipe(source('test-app.js'))
    .pipe(gulp.dest(dist.js));
});




// Task: Sass
gulp.task('sass', function() {
  return gulp.src(src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.reload({
      stream: true
    })
   );
});

// Task: Watch
gulp.task('watch', ['browserSync', 'js', 'sass', 'copy'], function() {
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.html, ['copy']);
  gulp.watch(src.alljs, ['js']);
  // var bundler = w;
});


// Task: BrowserSync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist',
    },
  })
});

// Task: HeaderJS(concat)
gulp.task('headerjs', function() {  
  return gulp.src(src.header)
    .pipe(concat(name.header))
    .pipe(uglify())
    .pipe(gulp.dest(dist.header))
    .on('error', gutil.log)
});

// Task: JS (concat)
gulp.task('appjs', function() {  
  return gulp.src(src.app)
    .pipe(concat(name.app))
    // .pipe(uglify())
    // .on('error', gutil.log)
    .pipe(gulp.dest(dist.app))
    .on('error', gutil.log)
});

// Task: VendorJS
gulp.task('vendorjs', function() {  
  return gulp.src(src.vendor)
    .pipe(concat(name.vendor))
    .pipe(uglify())
    .pipe(gulp.dest(dist.vendor))
    .on('error', gutil.log)
});

// Task : JS
gulp.task('js', ['appjs', 'headerjs', 'vendorjs'], function(){});

// Task: Copy
gulp.task( 'copy', function() {
  gulp.src(src.html) // index.html
    .pipe( gulp.dest( dist.html ));
  gulp.src('bower_components/font-awesome/fonts/*') // fontawesome
    .pipe( gulp.dest( 'dist/fonts/font-awesome'))
    .pipe(browserSync.reload({
      stream: true
    })
  );
});

// Task: Clean Up
gulp.task('clean', function () {
  del([
    'dist/js/*',
    'dist/fonts/*',
    'dist/css/*',
    'dist/*.html'
  ]);
});

// Task: Build
gulp.task('build', ['clean', 'sass', 'js', 'copy'], function(){});

// Task: Default (launch server and watch files for changes)
gulp.task('default', ['watch'], function(){});