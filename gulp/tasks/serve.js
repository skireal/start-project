const gulp = require('gulp')
const imageMinify = require('./imageMinify')
const styles = require('./styles')
const pug2html = require('./pug2html')
const includeHtml = require('./includeHtml')
const includeJs = require('./includeJs')
const buildJsVendors = require('./buildJsVendors')
const delFolders = require('./delFolders')
const server = require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports = function serve(cb) {
    server.init({
        server: 'build',
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch('src/img/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify, readyReload))
    gulp.watch('src/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)))
    gulp.watch('src/js/**/*.js', gulp.series(includeJs, delFolders, readyReload))
    // gulp.watch('src/**/*.pug', gulp.series(pug2html, prettifyHtml, readyReload))
    gulp.watch('src/**/*.html', gulp.series(includeHtml, readyReload))

    return cb()
}