"use strict";

const fs = require("fs");
const path = require("path");
const structByFormat = require("./src/extractData_test.js");
const fileName = "";
let struct = null;

const processData = (fileName, fns) => {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
		console.dir(data);
      const format = getDataFormat(fileName);
      //struct = structByFormat(data, fns, format);
    }
  });
};

const getDataFormat = (name) => {
  let format = path.extname(fileName);
  format = format.toString().slice(1, format.length);
  return format;
};