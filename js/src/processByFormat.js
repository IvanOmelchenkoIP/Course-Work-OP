'use strict';

const path = require('path');

const inputFormats = {
  json: (data) => {
    let obj = new Object(null);
    try {
      obj = JSON.parse(data);
    } catch (err) {
      console.error(err);
      return null;
    }
    return obj;
  },
};

const getObjByFormat = (data, fileName) => {
  return new Promise((resolve, reject) => {
    const dataFormat = getDataFormat(fileName);
    const formats = Object.keys(inputFormats);

    for (let format of formats) {
      if (format == dataFormat) {
        let obj = new Object(null);
        data = data.toString();
        obj = inputFormats[format](data);

        obj ? resolve(obj) : reject ('Could not convert your file into an object!');
      }
    }
    reject('Your file format is not supported');
  });
};

const getDataFormat = (fileName) => {
  let format = path.extname(fileName);
  format = format.toString().slice(1, format.length);
  return format;
};

module.exports = getObjByFormat;
