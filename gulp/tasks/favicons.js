const gulp = require('gulp')
const plumber = require('gulp-plumber')
const favicons = require('gulp-favicons')
const fs = require('fs')

module.exports = function generateFavicons(cb) {
    if (!fs.existsSync('src/img/favicon.png')) {
        console.warn('[favicons] src/img/favicon.png not found, skipping')
        return cb()
    }

    return gulp.src('src/img/favicon.png')
        .pipe(plumber())
        .pipe(favicons({
            background: '#ffffff',
            theme_color: '#ffffff',
            logging: false,
            icons: {
                android: false,
                appleIcon: true,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                windows: false,
                yandex: false,
            }
        }))
        .pipe(gulp.dest('build/img/favicons'))
}
