const gulp = require('gulp')
const plumber = require('gulp-plumber')
const fileinclude = require('gulp-file-include');

module.exports = function includeHtml() {
   return gulp.src('src/pages/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build')) 
}