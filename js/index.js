'use strict';

const fs = require('fs');
const fileName = '';

let struct = null;
const fileTypes = {
	json: data => {
		return data;
	}
}

fs.readFile(fileName, 'utf-8',(err, data) => {
	if (err) {
		console.error(err);
	} else {
		struct = getFormat(data, fileName);
	}	
});

const getFormat = (data, name) => {
	let obj = null;
	const msg = 'The structure could not be formed. Wrong file format.'
	const rexp = /[.][a-z]+/;
	let [format] = name.match(rexp);
	format = format.slice(1, format.length);
	
	const types = Object.keys(fileTypes);	
	for (let type of types) {
		if (type == format) {
			obj = fileTypes[type](data);
			break;
		}
	}

	if (obj !== null) return obj;
	else return msg;
}
