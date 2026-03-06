const gulp = require('gulp')
const svgmin = require('gulp-svgmin')
const svgstore = require('gulp-svgstore')
const path = require('path')

module.exports = function svgSprite() {
    return gulp.src('src/img/icons/*.svg')
        .pipe(svgmin(function (file) {
            const prefix = path.basename(file.relative, path.extname(file.relative))
            return {
                plugins: [
                    {name: 'cleanupIds', params: {prefix: prefix + '-', minify: true}},
                    {name: 'removeViewBox', active: false},
                    {name: 'removeDimensions'},
                ]
            }
        }))
        .pipe(svgstore({inlineSvg: true}))
        .pipe(gulp.dest('build/img'))
}
