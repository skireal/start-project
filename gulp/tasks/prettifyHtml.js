const gulp = require('gulp')
const plumber = require('gulp-plumber')
const prettify = require('gulp-html-prettify');


module.exports = function prettifyHtml() {
  return gulp.src('build/*.html')
    .pipe(plumber())
    .pipe(prettify({indent_char: ' ', indent_size: 4}))
    .pipe(gulp.dest('build/'))
}