'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var htmlminify = require("gulp-html-minify");
var karma = require('gulp-karma');
var testFiles = [
      './client/bower_components/angularjs/angular.js',
      './client/bower_components/angular-mocks/angular-mocks.js',
      './dev/**/*.js',
      './dev/**/*.spec.js'
];

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});


// Minify html files
gulp.task('compress-html', function() {
    return gulp.src("dev/**/*.html")
        .pipe(htmlminify())
        .pipe(gulp.dest("./app"));
});

// Annotate angular components
gulp.task('compress', function() {
    return gulp.src('dev/**/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./app'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("./app/**/*.html").on('change', browserSync.reload);
    gulp.watch("./app/**/*.js").on('change', browserSync.reload);
});

// Watch javascript changes, annonate and compress
gulp.task('watch', function() {
    gulp.watch('./dev/**/*.js', ['compress']);
    gulp.watch('./dev/**/*.html, ./index.html', ['compress-html']);
});

// Task by default
gulp.task('default', ['compress-html', 'compress', 'browser-sync', 'watch'], function() {
    gulp.src(testFiles)
        .pipe(karma({
          configFile: 'karma.conf.js',
          action: 'watch'
        }));
});
