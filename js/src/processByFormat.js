"use strict";

const inpTypes = {
  json: (data) => {
    return extractFromJSON(data);
  },
};

const getStruct = (data, format) => {
  const types = Object.keys(inpTypes);
  let obj = null;
  for (let type of types) {
    if (type == format) {
      obj = inpTypes[type](data);
      break;
    }
  }

  if (obj !== null) return obj;
  else return null;
};

const extractFromJSON = (data) => {
  const struct = new Object(null);
  let sData = null;
  try {
    sData = JSON.parse(data.toString());
  } catch (err) {
    console.error(err);
  }
  let keys = Object.keys(sData);
  console.log(keys);
  return;
};

module.exports = getStruct;
