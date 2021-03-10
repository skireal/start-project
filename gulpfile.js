const { series, parallel, src, dest, watch, lastRun } = require('gulp');
const gulp = require('gulp')
const serve = require('./gulp/tasks/serve')
const pug2html = require('./gulp/tasks/pug2html')
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
const buildLibrary = process.env.BUILD_LIBRARY || false;
const mode = process.env.MODE || 'development';
const nth = {};
nth.config = require('./config.js');
nth.blocksFromHtml = Object.create(nth.config.alwaysAddBlocks); // блоки из конфига сразу добавим в список блоков
nth.scssImportsList = []; // список импортов стилей
const dir = nth.config.dir;

// Сообщение для компилируемых файлов
let doNotEditMsg = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';


// Пока не буду использовать Pug

// function writePugMixinsFile(cb) {
//   let allBlocksWithPugFiles = getDirectories('pug');
//   let pugMixins = '//-' + doNotEditMsg.replace(/\n /gm,'\n  ');
//   allBlocksWithPugFiles.forEach(function(blockName) {
//     pugMixins += `include ${dir.blocks.replace(dir.src,'../')}${blockName}/${blockName}.pug\n`;
//   });
//   fs.writeFileSync(`${dir.src}pug/mixins.pug`, pugMixins);
//   cb();
// }
// exports.writePugMixinsFile = writePugMixinsFile;


function writeStartStylesFile(cb) {
    const scssRequiresList = [];
    let allBlocksWithStyleFiles = getDirectories('scss');
    let styleMixins = ''
    allBlocksWithStyleFiles.forEach(function(blockName) {
        if (nth.config.alwaysAddBlocks.indexOf(blockName) == -1) return;
        scssRequiresList.push(`../blocks/${blockName}/${blockName}.scss`)

    });

    scssRequiresList.forEach(function(src) {
        styleMixins += `@import '${src}';\n`;
    });

    fs.writeFileSync(`${dir.src}scss/global/start.scss`, styleMixins);
    cb();
}
exports.writeStartStylesFile = writeStartStylesFile;



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
    parallel(writeStartStylesFile, buildJsVendors, includeHtml, fonts, imageMinify),
    parallel(styles, includeJs),
    delFolders, serve)