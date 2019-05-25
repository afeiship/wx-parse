(function() {
  'use strict';

  const gulp = require('gulp');
  const pkg = require('../package.json');
  const config = require('./config');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  require('next-nice-comments');

  const niceComments = nx.niceComments(
    [
      'name: <%= pkg.name %>',
      'link: <%= pkg.homepage %>',
      'version: <%= pkg.version %>',
      'license: <%= pkg.license %>'
    ],
    'js'
  );

  gulp.task('scripts', function() {
    return gulp
      .src('src/*.js')
      .pipe($.header(niceComments, { pkg: pkg }))
      .pipe(gulp.dest('dist'))
      .pipe($.size({ title: '[ default size ]:' }))
      .pipe($.uglify(config.uglifyOptions))
      .pipe($.rename({ extname: '.min.js' }))
      .pipe(gulp.dest('dist'))
      .pipe($.size({ title: '[ minimize size ]:' }));
  });
})();
