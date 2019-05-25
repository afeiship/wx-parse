(function() {
  'use strict';

  const gulp = require('gulp');
  const config = require('./config');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  //clean
  gulp.task('tmpl', () =>
    gulp
      .src('src/htmls/html_deepth_tmpl.wxml')
      .pipe($.data(() => ({ i: 1, j: 2 })))
      .pipe($.template())
      .pipe(gulp.dest('dist'))
  );
})();
