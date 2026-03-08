const gulp = require('gulp')
const serve = require('./gulp/tasks/serve')
const includeHtml = require('./gulp/tasks/includeHtml')
const includeJs = require('./gulp/tasks/includeJs')
const styles = require('./gulp/tasks/styles')
const fonts = require('./gulp/tasks/fonts')
const imageMinify = require('./gulp/tasks/imageMinify')
const imageWebp = require('./gulp/tasks/imageWebp')
const svgSprite = require('./gulp/tasks/svgSprite')
const generateFavicons = require('./gulp/tasks/favicons')
const clean = require('./gulp/tasks/clean')
const buildJsVendors = require('./gulp/tasks/buildJsVendors')
const delFolders = require('./gulp/tasks/delFolders')


module.exports.start = gulp.series(clean,
    gulp.parallel(buildJsVendors, includeHtml, fonts, imageMinify, imageWebp, svgSprite, generateFavicons),
    gulp.parallel(styles, includeJs),
    delFolders, serve)

module.exports.build = gulp.series(clean,
    gulp.parallel(buildJsVendors, includeHtml, fonts, imageMinify, imageWebp, svgSprite, generateFavicons),
    gulp.parallel(styles, includeJs),
    delFolders)
