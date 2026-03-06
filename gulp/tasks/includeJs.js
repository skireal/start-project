const gulp = require('gulp')
const plumber = require('gulp-plumber')
const rigger = require('gulp-rigger')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const gulpif = require('gulp-if')

const isProd = process.env.NODE_ENV === 'production'

module.exports = function includeJs() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rigger())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulpif(isProd, terser()))
        .pipe(gulpif(!isProd, sourcemaps.write('.')))
        .pipe(gulp.dest('build/js'))
}