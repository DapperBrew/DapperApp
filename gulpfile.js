var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

// compile Sass
gulp.task('sass', function() {
	return gulp.src('app/scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream: true
		})
	 );
});

// watch files
gulp.task('watch', ['browserSync', 'sass', 'copy'], function() {
	gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
	gulp.watch('app/*.html', ['copy']);
});

// Start browserSync server
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
})

//Copy necessary
gulp.task( 'copy', function() {
	// copy index.html to app
	gulp.src('app/*.html')
		.pipe( gulp.dest( 'dist' ));
	// copy font-awesome
	gulp.src('bower_components/font-awesome/fonts/*')
		.pipe( gulp.dest( 'dist/fonts/font-awesome'))
	// copy jquery to app
	gulp.src('bower_components/jquery/dist/jquery.min.js')
		.pipe( gulp.dest( 'dist/js/vendor' ));
	// copy modernizr to app
	gulp.src('bower_components/modernizr/modernizr.js')
		.pipe( gulp.dest( 'dist/js/vendor' ))
		.pipe(browserSync.reload({
    	stream: true
  	})
	);
});




// default task
gulp.task('default', ['watch'], function(){});