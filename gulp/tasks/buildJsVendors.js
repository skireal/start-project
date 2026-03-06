const gulp = require('gulp')
const plumber = require('gulp-plumber')
const concat = require('gulp-concat')
const terser = require('gulp-terser')

// Вендоры берутся из node_modules — не нужно хранить их в репозитории
const vendors = [
  'node_modules/swiper/swiper-bundle.min.js',
  'node_modules/choices.js/public/assets/scripts/choices.min.js',
]

module.exports = function buildJsVendors() {
    return gulp.src(vendors)
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(terser())
        .pipe(gulp.dest('build/js'))
}