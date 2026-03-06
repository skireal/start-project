const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')(require('sass'))
const shorthand = require('gulp-shorthand')
const autoprefixer = require('gulp-autoprefixer')
const csscomb = require('gulp-csscomb')
const sourcemaps = require('gulp-sourcemaps')

module.exports = function styles() {
  return gulp.src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(shorthand())
    .pipe(csscomb())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
}