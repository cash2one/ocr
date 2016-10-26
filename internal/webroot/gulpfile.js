'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var glob = require('glob');
var eventStream = require('event-stream');
var less = require('gulp-less');
var watch = require('gulp-watch');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

gulp.task('jsCompile', function () {
    glob('./src/entry/**.jsx', function(err, files) {
        if (err) {
            gutil.log(err);
        }
        var tasks = files.map(function(entry) {
            gutil.log('File: ' + entry + ', started');
            var b = browserify({
                entries: [entry],
                extensions: ['.jsx', '.js'],
                transform: [babelify]
            });
            return b.bundle()
                .pipe(source(entry))
                .pipe(
                    rename({
                        dirname: '',
                        extname:".bundle.js"
                    })
                )
                .pipe(buffer())
                .pipe(uglify())
                .on('error', gutil.log)
                .on('end', function () {
                    gutil.log('File: ' + entry + ', finished')
                })
                .pipe(gulp.dest('./dist/js/'));
        });

        eventStream.merge(tasks).on('end', function (){
            gutil.log('Task jsCompile: finished!');
        });
    });
});

gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(
            rename({
                dirname: '',
                extname:".css"
            })
        )
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('jsCompile_watch', function () {
    return watch('./src/**/*.jsx', function () {
        gutil.log('Task jsCompile: started!');
        glob('./src/entry/**.jsx', function(err, files) {
            if (err) {
                gutil.log(err);
            }

            var tasks = files.map(function(entry) {
                var b = browserify({
                    entries: [entry],
                    debug: true,
                    transform: [babelify],
                    extensions: ['.jsx', '.js']
                });

                return b.bundle()
                    .pipe(source(entry))
                    .pipe(
                        rename({
                            dirname: '',
                            extname:".bundle.js"
                        })
                    )
                    .pipe(buffer())
                    .on('error', gutil.log)
                    .pipe(gulp.dest('./dist/js/'));
            });

            eventStream.merge(tasks).on('end', function (){
                gutil.log('Task jsCompile: finished!');
            });
        });
    });
});

gulp.task('less_watch', function () {
    return watch('./src/less/**/*.less', function () {
        gutil.log('Task Less: started!');
        gulp.src('./src/less/*.less')
            .pipe(less())
            .pipe(
                rename({
                    dirname: '',
                    extname:".css"
                })
            )
            .pipe(gulp.dest('./dist/css'));
        gutil.log('Task Less: finished!');
    });
});

gulp.task('default', ['jsCompile', 'less']);

gulp.task('watch', ['jsCompile_watch', 'less_watch']);