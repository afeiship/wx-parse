(function() {
  'use strict';

  const gulp = require('gulp');
  const fs = require('fs');
  var pkg = JSON.parse(fs.readFileSync('./package.json'));
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  //clean
  gulp.task(
    'tmpl',
    gulp.parallel(function(callback) {
      var deepth = pkg.buildConfig.deepth || 2;
      for (var i = 0; i < deepth; i++) {
        (function(num) {
          gulp
            .src('src/templates/html_deepth_tmpl.wxml')
            .pipe($.data(() => ({ i: num + 1, j: num + 2 })))
            .pipe($.template())
            .pipe($.rename('html' + (num + 1) + '.wxml'))
            .pipe(gulp.dest('dist/htmls'));
        })(i);
      }
      callback();
    })
  );
})();
