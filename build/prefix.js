(function() {
  'use strict';

  const gulp = require('gulp');
  const fs = require('fs');
  var pkg = JSON.parse(fs.readFileSync('./package.json'));
  var DEFAULT_OPTIONS = { base: 'src' };
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  //clean
  gulp.task(
    'prefix',
    gulp.parallel(function() {
      return gulp
        .src([
          'src/html.wxml',
          'src/style.scss',
          'src/tags/**',
        ], DEFAULT_OPTIONS)
        .pipe($.ejs(pkg.buildConfig))
        .pipe(gulp.dest('dist'));
    })
  );
})();
