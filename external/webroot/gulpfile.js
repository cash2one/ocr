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
var nano = require('gulp-cssnano');
var watch = require('gulp-watch');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var autoPrefixer = require('gulp-autoprefixer');
var fs = require('fs');
var nodePath = require('path');

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
                        path.dirname = path.dirname.replace(/src(\\|\/)entry/g, '');
                        path.extname = '.bundle.js';
                    })
                )
                .pipe(buffer())
                .pipe(uglify({
                    preserveComments: 'license',
                    /* eslint-disable */
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
                    /* eslint-enable */
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
        .pipe(autoPrefixer({
            browsers: ['IE >= 9', 'Firefox > 1', 'Chrome > 1']
        }))
        .pipe(nano())
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
                            path.dirname = path.dirname.replace(/src(\\|\/)entry/g, '');
                            path.extname = '.bundle.js';
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
                    path.extname = '.css';
                })
            )
            .pipe(gulp.dest('./dist/css'));
        gutil.log('Task Less: finished!');
    });
});

var jsExcludes = [
    '/dist/js/solution/robot.bundle.js',
    '/dist/js/solution/faceprint.bundle.js',
    '/dist/js/support/video.bundle.js',
    '/dist/js/support/about-us.bundle.js',
    '/dist/js/sdk/sdk.bundle.js'
];

gulp.task('html_watch', function () {
    return watch('./src/view/**/*.html', function () {
        gutil.log('Task Html: started!');

        glob('./src/view/**/!(*template).html', function (err, files) {
            if (err) {
                gutil.log(err);
            }
            var tasks = files.map(function (entry) {
                var data = fs.readFileSync(entry, 'utf-8');
                var basename = nodePath.basename(entry, '.html');
                var relativePath = nodePath.relative('src/view', entry);
                var dirname = nodePath.dirname(relativePath);
                dirname = dirname === '.' ? '' : dirname;

                var cssPath = nodePath.join('/dist/css/', dirname, basename + '.css').replace(/\\/g, '/');
                var jsPath = nodePath.join('/dist/js/', dirname, basename + '.bundle.js').replace(/\\/g, '/');
                return gulp.src('./src/view/common/template.html')
                    .pipe(replace(/\{\{body}}/g, data))
                    .pipe(replace(/<\/head>/g, '<link rel="stylesheet" href="' + cssPath + '"></head>'))
                    .pipe(replace(/<\/body>/g,
                        jsExcludes.indexOf(jsPath) === -1
                            ? ('<script src="' + jsPath + '"></script></body>')
                            : '</body>'
                        )
                    )
                    .pipe(
                        rename({
                            dirname: dirname,
                            basename: basename,
                            extname: '.tpl'
                        })
                    )
                    .pipe(gulp.dest('../template/brain/platform'));
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
