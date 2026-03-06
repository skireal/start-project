const gulp = require('gulp')
const webp = require('gulp-webp')
const changed = require('gulp-changed')

module.exports = function imageWebp() {
  return gulp.src('src/img/**/*.{png,jpg,jpeg}')
    .pipe(changed('build/img', { extension: '.webp' }))
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest('build/img'))
}
