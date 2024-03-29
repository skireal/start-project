const gulp = require('gulp')
const plumber = require('gulp-plumber')
const rigger = require('gulp-rigger')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const beautify = require('gulp-jsbeautifier');

module.exports = function includeJs() {
   return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(rigger())
    .pipe(beautify())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    // .pipe(terser())
    .pipe(gulp.dest('build/js')) 
}