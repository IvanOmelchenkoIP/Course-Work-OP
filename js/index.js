'use strict';

const fs = require('fs');
const path = require('path');
const getStruct = require('./src/extractData.js');
const fileName = '';
let struct = null;

fs.readFile(fileName, 'utf-8',(err, data) => {
	if (err) {
		console.error(err);
	} else {
		const format = getDataFormat(fileName);
		struct = getStruct(data, format);
	}	
});

const getDataFormat = name => {
	let format = path.extname(fileName);
	format = format.toString().slice(1, format.length);
	return format;
}