const gulp = require('gulp')
const pug = require('gulp-pug')
const config = require('../config')


module.exports = function pug2html() {
  return gulp.src('src/pages/*.pug')
    .pipe(pug({ pretty: config.pug2html.beautifyHtml }))
    .pipe(gulp.dest('build'))
}