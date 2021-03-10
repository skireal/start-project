const gulp = require('gulp')
const plumber = require('gulp-plumber')
const prettify = require('gulp-html-prettify')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

module.exports = function buildJsVendors() {
    return gulp.src('src/js/vendors/*')
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
}