"use strict";

const inputFormats = {
  json: (data, fns) => objFromJSON(data, fns),
};

const objFromJSON = (data, fns) => {
  let jsonObj = new Object(null);
  try {
    jsonObj = JSON.parse(data.toString());
  } catch (err) {
    console.log("There wa an error to conver your .json-file into an object");
    return null;
  }
  return getNewObj(jsonObj, fns);
};

const structByFormat = (data, fns, recFormat) => {
  const formats = Object.keys(inputFormats);
  for (let format of formats) {
    if (format == recFormat) {
      return inputTypes[format](data, fns);
    }
  }
  console.log("Your file format is not supported!");
  return null;
};

const getNewObj = (obj, fns) => {
  let newObj = new Object(null);
  newObj = formNewObj(obj, fns);
  console.dir(newObj);
};

module.exports = structByFormat;
