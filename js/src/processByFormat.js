"use strict";

const path = require("path");
const formNewObj = require("./formNewObj.js");

const inputFormats = {
  json: (data, fns) => objFromJSON(data, fns),
};
const objFromJSON = (data, fns) => {
  let jsonObj = new Object(null);
  try {
    jsonObj = JSON.parse(data.toString());
  } catch (err) {
    console.log("There was an error to convert your .json-file into an object");
    console.error(err);
    return null;
  }
  return getNewObj(jsonObj, fns);
};

const processByFormat = (data, fns, fileName) => {
  const recFormat = getDataFormat(fileName);
  const formats = Object.keys(inputFormats);
  for (let format of formats) {
    if (format == recFormat) {
      return inputFormats[format](data, fns);
    }
  }
  console.log("Your file format is not supported!");
  return null;
};
const getDataFormat = (fileName) => {
  let format = path.extname(fileName);
  format = format.toString().slice(1, format.length);
  return format;
};

const getNewObj = (obj, fns) => {
  let newObj = new Object(null);
  newObj = formNewObj(obj, fns);
  return newObj && Object.keys(newObj).length ? newObj : null;
};

module.exports = processByFormat;
