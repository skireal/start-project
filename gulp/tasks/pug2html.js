const gulp = require('gulp')
const plumber = require('gulp-plumber')
const bemValidator = require('gulp-html-bem-validator')
const pug = require('gulp-pug')
const config = require('../config')


module.exports = function pug2html() {
  return gulp.src('src/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: config.pug2html.beautifyHtml }))
    .pipe(bemValidator())
    .pipe(gulp.dest('build'))
}