const { series, parallel, src, dest, watch, lastRun } = require('gulp');
const gulp = require('gulp')
const serve = require('./gulp/tasks/serve')
const pug2html = require('./gulp/tasks/pug2html')
const includeHtml = require('./gulp/tasks/includeHtml')
const includeJs = require('./gulp/tasks/includeJs')
const styles = require('./gulp/tasks/styles')
const fonts = require('./gulp/tasks/fonts')
const prettifyHtml = require('./gulp/tasks/prettifyHtml')
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


function writePugMixinsFile(cb) {
  let allBlocksWithPugFiles = getDirectories('pug');
  let pugMixins = '//-' + doNotEditMsg.replace(/\n /gm,'\n  ');
  allBlocksWithPugFiles.forEach(function(blockName) {
    pugMixins += `include ${dir.blocks.replace(dir.src,'../')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync(`${dir.src}pug/mixins.pug`, pugMixins);
  cb();
}
exports.writePugMixinsFile = writePugMixinsFile;



// function writeJsRequiresFile(cb) {
//   const jsRequiresList = [];
//   nth.config.addJsBefore.forEach(function(src) {
//     jsRequiresList.push(src);
//   });
//   const allBlocksWithJsFiles = getDirectories('js');
//   allBlocksWithJsFiles.forEach(function(blockName){
//     if (nth.config.alwaysAddBlocks.indexOf(blockName) == -1) return;
//     jsRequiresList.push(`../blocks/${blockName}/${blockName}.js`)
//   });
//   allBlocksWithJsFiles.forEach(function(blockName){
//     let src = `../blocks/${blockName}/${blockName}.js`
//     console.log(src);
//     if (nth.blocksFromHtml.indexOf(blockName) == -1) return;
//     if (jsRequiresList.indexOf(src) > -1) return;
//     jsRequiresList.push(src);
//   });
//   nth.config.addJsAfter.forEach(function(src) {
//     jsRequiresList.push(src);
//   });
//   let msg = `\n/*!*${doNotEditMsg.replace(/\n /gm,'\n * ').replace(/\n\n$/,'\n */\n\n')}`;
//   let jsRequires = msg + '/* global require */\n\n';
//   jsRequiresList.forEach(function(src) {
//     jsRequires += `require('${src}');\n`;
//   });
//   jsRequires += msg;

//   fs.writeFileSync(`${dir.src}js/entry.js`, jsRequires);
//   console.log('---------- Write new entry.js');
//   cb();
// }
// exports.writeJsRequiresFile = writeJsRequiresFile;



// function buildJs() {
//   const entryList = {
//     'bundle': `./${dir.src}js/entry.js`,
//   };
//   if(buildLibrary) entryList['blocks-library'] = `./${dir.blocks}blocks-library/blocks-library.js`;
//   return src(`${dir.src}js/entry.js`)
//     .pipe(plumber())
//     .pipe(webpackStream({
//       mode: mode,
//       entry: entryList,
//       devtool: 'inline-source-map',
//       output: {
//         filename: '[name].js',
//       },
//       resolve: {
//         alias: {
//           Utils: path.resolve(__dirname, 'src/js/utils/'),
//         },
//       },
//       module: {
//         rules: [
//           {
//             test: /\.(js)$/,
//             exclude: /(node_modules)/,
//             loader: 'babel-loader',
//             query: {
//               presets: ['@babel/preset-env']
//             }
//           }
//         ]
//       },
//       // externals: {
//       //   jquery: 'jQuery'
//       // }
//     }))
//     .pipe(dest(`${dir.build}js`));
// }
// exports.buildJs = buildJs;



// Функции, не являющиеся задачами Gulp ----------------------------------------

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки
 * @return {boolean}
 */
function fileExist(filepath){
  let flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }catch(e){
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





module.exports.start =  gulp.series(clean, writePugMixinsFile, pug2html, includeHtml, includeJs, styles, buildJsVendors, delFolders, fonts, prettifyHtml, imageMinify, serve)