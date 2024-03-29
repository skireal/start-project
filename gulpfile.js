const { series, parallel, src, dest, watch, lastRun } = require('gulp');
const gulp = require('gulp')
const serve = require('./gulp/tasks/serve')
const includeHtml = require('./gulp/tasks/includeHtml')
const includeJs = require('./gulp/tasks/includeJs')
const styles = require('./gulp/tasks/styles')
const fonts = require('./gulp/tasks/fonts')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')
const buildJsVendors = require('./gulp/tasks/buildJsVendors')
const delFolders = require('./gulp/tasks/delFolders')
const fs = require('fs');
const plumber = require('gulp-plumber');
const path = require('path');


// Глобальные настройки этого запуска
const nth = {};
nth.config = require('./config.js');
const dir = nth.config.dir;


// Функции, не являющиеся задачами Gulp ----------------------------------------

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки
 * @return {boolean}
 */
function fileExist(filepath) {
    let flag = true;
    try {
        fs.accessSync(filepath, fs.F_OK);
    } catch (e) {
        flag = false;
    }
    return flag;
}

/**
 * Получение всех названий поддиректорий, содержащих файл указанного расширения, совпадающий по имени с поддиректорией
 * @param  {string} ext    Расширение файлов, которое проверяется
 * @return {array}         Массив из имён блоков
 */
function getDirectories(ext) {
    let source = dir.blocks;
    let res = fs.readdirSync(source)
        .filter(item => fs.lstatSync(source + item).isDirectory())
        .filter(item => fileExist(source + item + '/' + item + '.' + ext));
    return res;
}


module.exports.start = gulp.series(clean,
    parallel(buildJsVendors, includeHtml, fonts, imageMinify),
    parallel(styles, includeJs),
    delFolders, serve)