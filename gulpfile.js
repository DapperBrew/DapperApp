// ----------------------------------------------------------------------------------------
// Plugins
// ----------------------------------------------------------------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');



// ----------------------------------------------------------------------------------------
// Settings
// ----------------------------------------------------------------------------------------

var vendorjs = [
	"bower_components/jquery/dist/jquery.min.js",
	"bower_components/modernizr/modernizr.js",
	"bower_components/jquery-throttle-debounce/jquery.ba-throttle-debounce.min.js"
];

var src = {
  sass: "app/scss/**/*.scss",
  appjs: "app/js/app.js", // main JS file
  js: "app/js/**/*.js", // all JS files
  vendor: vendorjs,
  img: "app/imges/*",
  html: "app/*.html"
};

var output = {
	appjs: "dist/js",
  js: "dist/js",
  css: "dist/css",
  img: "dist/img",
  html: "dist",
  vendor: "dist/js/vendor",
  min_css: 'app.min.css',
  min_ven: 'vendor.min.js',
  min_appjs: 'app.min.js',
};

// ----------------------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------------------

// Task: Browserify & Watchify
var b 				= browserify(src.appjs, watchify.args);
var w 				= watchify(browserify(src.appjs, watchify.args));
w.on('update', bundle);

gulp.task('watchify', bundle);


gulp.task('browserify', function() {
	w = b
	bundle();
});

function bundle() {
  return w
  	.bundle()
    .pipe(source(output.min_appjs))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output.js))
    .pipe(browserSync.reload({stream:true}));
}

// Task: Sass
gulp.task('sass', function() {
	return gulp.src(src.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output.css))
		.pipe(browserSync.reload({
			stream: true
		})
	 );
});

// Task: Watch
gulp.task('watch', ['browserSync', 'sass', 'copy', 'watchify'], function() {
	gulp.watch(src.sass, ['sass']);
	gulp.watch(src.html, ['copy']);
	var bundler = w;
	//gulp.watch(src.js, ['copy', 'vendor']);
});


// Task: BrowserSync
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
});

// Task: Vendor (concat)
gulp.task('vendor', function() {  
  return gulp.src(src.vendor)
    .pipe(concat(output.min_ven))
    .pipe(uglify())
    .pipe(gulp.dest(output.vendor))
    .on('error', gutil.log)
});

// Task: Copy
gulp.task( 'copy', function() {
	gulp.src(src.html) // index.html
		.pipe( gulp.dest( output.html ));
	gulp.src('bower_components/font-awesome/fonts/*') // fontawesome
		.pipe( gulp.dest( 'dist/fonts/font-awesome'))
	gulp.src('app/js/main.js') // main.js
		.pipe( gulp.dest( 'dist/js' ))
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
gulp.task('build', ['clean', 'sass', 'copy', 'vendor'], function(){});

// Task: Default (launch server and watch files for changes)
gulp.task('default', ['watch'], function(){});