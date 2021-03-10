const gulp = require('gulp')
const plumber = require('gulp-plumber')
const fileinclude = require('gulp-file-include');
const prettify = require('gulp-html-prettify')

module.exports = function includeHtml() {
   return gulp.src('src/pages/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 4}))
    .pipe(gulp.dest('build')) 
}