const gulp = require('gulp')
const plumber = require('gulp-plumber')
const eslint = require('gulp-eslint')

module.exports = function script() {
  return gulp.src('src/js/main.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest('build/js'))
}