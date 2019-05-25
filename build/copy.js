(function() {
  'use strict';

  const gulp = require('gulp');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });
  var DEFAULT_OPTIONS = { base: 'src' };

  //clean
  gulp.task(
    'copy',
    gulp.parallel(function() {
      return gulp
        .src(
          [
            'src/components/**',
            'src/tags/**',
            'src/htmls/**',
            'src/html.wxml',
            'src/styles.scss'
          ],
          DEFAULT_OPTIONS
        )
        .pipe(gulp.dest('dist'));
    })
  );
})();
