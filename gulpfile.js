const gulp = require('gulp')

const serve = require('./gulp/tasks/serve')
const pug2html = require('./gulp/tasks/pug2html')
const styles = require('./gulp/tasks/styles')
const script = require('./gulp/tasks/script')
const fonts = require('./gulp/tasks/fonts')
const prettifyHtml = require('./gulp/tasks/prettifyHtml')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')

module.exports.start =  gulp.series(pug2html, styles, script, fonts, prettifyHtml, imageMinify, serve)