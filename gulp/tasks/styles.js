const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const shorthand = require('gulp-shorthand')
const autoprefixer = require('gulp-autoprefixer')
const csscomb = require('gulp-csscomb')

module.exports = function styles() {
  return gulp.src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(shorthand())
    .pipe(csscomb())
    .pipe(gulp.dest('build/css'))
}