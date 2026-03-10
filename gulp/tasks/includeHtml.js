const gulp = require('gulp')
const plumber = require('gulp-plumber')

module.exports = function copyHtml() {
    return gulp.src('src/pages/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('build'))
}
