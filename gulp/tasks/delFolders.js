const gulp = require('gulp')
const del = require('del')

module.exports = function delFolders() {
	return del(['build/js/vendors'])
}