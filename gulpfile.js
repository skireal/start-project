const gulp = require('gulp')

const pug2html = require('./gulp/tasks/pug2html')
const styles = require('./gulp/tasks/styles')

module.exports.start =  gulp.parallel(pug2html, styles)