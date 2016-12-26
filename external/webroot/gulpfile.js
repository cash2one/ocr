'use strict';
/**
 *@file gulp tasks config file
 *@author shiliang@baidu.com
 *
 */

var gulp = require('gulp');
var browserify = require('browserify');
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
var replace = require('gulp-replace');
var fs = require('fs');

gulp.task('jsCompile', function () {
    glob('./src/entry/**/*.js', function (err, files) {
        if (err) {
            gutil.log(err);
        }
        var tasks = files.map(function (entry) {
            gutil.log('File: ' + entry + ', started');
            var b = browserify({
                entries: [entry],
                extensions: ['.jsx', '.js'],
                transform: [babelify]
            });
            return b.bundle()
                .pipe(source(entry))
                .pipe(
                    rename(function (path) {
                        path.dirname = path.dirname.replace(/src\\entry/g, '');
                        path.extname = ".bundle.js"
                    })
                )
                .pipe(buffer())
                .pipe(uglify({
                    preserveComments: 'license',
                    compress: {
                        sequences: true,  // join consecutive statemets with the “comma operator”
                        properties: true,  // optimize property access: a["foo"] → a.foo
                        dead_code: true,  // discard unreachable code
                        drop_debugger: true,  // discard “debugger” statements
                        unsafe: false, // some unsafe optimizations (see below)
                        conditionals: true,  // optimize if-s and conditional expressions
                        comparisons: true,  // optimize comparisons
                        evaluate: true,  // evaluate constant expressions
                        booleans: true,  // optimize boolean expressions
                        loops: true,  // optimize loops
                        unused: true,  // drop unused variables/functions
                        hoist_funs: true,  // hoist function declarations
                        hoist_vars: false, // hoist variable declarations
                        if_return: true,  // optimize if-s followed by return/continue
                        join_vars: true,  // join var declarations
                        cascade: true,  // try to cascade `right` into `left` in sequences
                        side_effects: true,  // drop side-effect-free statements
                        warnings: false   // warn about potentially dangerous optimizations/code
                    }
                }))
                .on('error', gutil.log)
                .on('end', function () {
                    gutil.log('File: ' + entry + ', finished');
                })
                .pipe(gulp.dest('./dist/js/'));
        });

        eventStream.merge(tasks).on('end', function () {
            gutil.log('Task jsCompile: finished!');
        });
    });
});

gulp.task('less', function () {
    return gulp.src(['./src/less/**/*.less', '!./src/less/common/*.less', '!./src/less/widget/*.less'])
        .pipe(less())
        .pipe(
            rename({
                extname: '.css'
            })
        )
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('jsCompile_watch', function () {
    return watch('./src/**/*.js', function () {
        gutil.log('Task jsCompile: started!');
        glob('./src/entry/**/*.js', function (err, files) {
            if (err) {
                gutil.log(err);
            }

            var tasks = files.map(function (entry) {
                var b = browserify({
                    entries: [entry],
                    debug: true,
                    transform: [babelify],
                    extensions: ['.jsx', '.js']
                });

                return b.bundle()
                    .pipe(source(entry))
                    .pipe(
                        rename(function (path) {
                            path.dirname = path.dirname.replace(/src\\entry/g, '');
                            path.extname = ".bundle.js"
                        })
                    )
                    .pipe(buffer())
                    .on('error', gutil.log)
                    .pipe(gulp.dest('./dist/js/'));
            });

            eventStream.merge(tasks).on('end', function () {
                gutil.log('Task jsCompile: finished!');
            });
        });
    });
});

gulp.task('less_watch', function () {
    return watch('./src/less/**/*.less', function () {
        gutil.log('Task Less: started!');
        gulp.src(['./src/less/**/*.less', '!./src/less/common/*.less', '!./src/less/widget/*.less'])
            .pipe(less())
            .pipe(
                rename(function (path) {
                    path.extname = ".css"
                })
            )
            .pipe(gulp.dest('./dist/css'));
        gutil.log('Task Less: finished!');
    });
});


gulp.task('html_watch', function () {
    return watch('./src/view/**/*.html', function () {
        gutil.log('Task Html: started!');

        glob('./src/view/**/!(*template).html', function (err, files) {
            if (err) {
                gutil.log(err);
            }
            var tasks = files.map(function (entry) {
                var data = fs.readFileSync(entry, 'utf-8');
                var basename = entry.match(/\/([\w-]+)\.html/)[1];
                var dirname = entry.match(/(\w+)\/([\w-]+)\.html/)[1].replace('view', '');
                var cssPath = '/dist/css/' + (dirname ? (dirname + '/') : '') + basename + '.css';
                var jsPath = '/dist/js/' + (dirname ? (dirname + '/') : '') + basename + '.bundle.js';
                return gulp.src('./src/view/common/template.html')
                    .pipe(replace(/{{body}}/g, data))
                    .pipe(replace(/<\/head>/g, '<link rel="stylesheet" href="' + cssPath + '"></head>'))
                    .pipe(replace(/<\/body>/g, '<script src="' + jsPath + '"></script></body>'))
                    .pipe(
                        rename({
                            dirname: dirname,
                            basename: basename
                        })
                    )
                    .pipe(gulp.dest('./dist/html'));
            });

            eventStream.merge(tasks).on('end', function () {
                gutil.log('Task Html: finished!');
            });
        });
    });
});

gulp.task('apply-prod-environment', function () {
    process.env.NODE_ENV = 'production';
});

gulp.task('default', ['apply-prod-environment', 'jsCompile', 'less']);

gulp.task('watch', ['jsCompile_watch', 'less_watch', 'html_watch']);
