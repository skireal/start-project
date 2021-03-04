const gulp = require('gulp')

const pug2html = require('./gulp/tasks/pug2html')
const styles = require('./gulp/tasks/styles')
const prettifyHtml = require('./gulp/tasks/prettifyHtml')

module.exports.start =  gulp.parallel(pug2html, styles, prettifyHtml)