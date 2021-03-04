const gulp = require('gulp')

const server = require('./gulp/tasks/server')
const pug2html = require('./gulp/tasks/pug2html')
const styles = require('./gulp/tasks/styles')
const prettifyHtml = require('./gulp/tasks/prettifyHtml')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')

module.exports.start =  gulp.series(pug2html, styles, prettifyHtml, imageMinify, server)