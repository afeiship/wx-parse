(function() {
  'use strict';

  const gulp = require('gulp');
  const fs = require('fs');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });
  var DEFAULT_OPTIONS = { base: 'src' };
  var pkg = JSON.parse(fs.readFileSync('./package.json'));

  //clean
  gulp.task(
    'copy',
    gulp.parallel(function() {
      return gulp
        .src(
          [
            'src/components/**',
            'src/htmls/**',
          ],
          DEFAULT_OPTIONS
        )
        .pipe(gulp.dest('dist'));
    })
  );
})();
