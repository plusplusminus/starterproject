var gulp         = require('gulp'),
    minifycss    = require('gulp-uglifycss'),
    filter       = require('gulp-filter'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'), // Helps prevent stream crashing on errors
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
    rename       = require('gulp-rename');

gulp.task('sass', function () {
    return  gulp.src('./assets/scss/*.scss')
                .pipe(plumber())
                .pipe(sourcemaps.init())
                .pipe(sass({
                    errLogToConsole: true,

                    //outputStyle: 'compressed',
                    outputStyle: 'compact',
                    // outputStyle: 'nested',
                    // outputStyle: 'expanded',
                    precision: 10
                }))
                .pipe(sourcemaps.write({includeContent: false}))
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
                .pipe(sourcemaps.write('.'))
                .pipe(plumber.stop())
                .pipe(gulp.dest('./assets/css/'))
                .pipe(filter('**/*.css')) // Filtering stream to only css files
                .pipe(rename({ suffix: '.min' }))
                .pipe(minifycss({
                    maxLineLen: 80
                }))
                .pipe(gulp.dest('./assets/css/'))
                .resume()
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch('./assets/scss/**/*.scss', ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);