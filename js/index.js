"use strict";

const fs = require("fs");
const processByFormat = require("./src/processByFormat.js");
let fileNum = 0;
const timeCounter = 3;
const fileName = "file.json";


const processData = (fileName, fns) => {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log("There was an error reading your file!");
      console.error(err);
    } else {
      let struct = new Object(null);
      struct = processByFormat(data, fns, fileName);
      newFile(struct);
    }
  });
};

const newFile = (struct) => {
  if (!struct || !Object.keys(struct).length) {
    console.log("There is no data to write in new file!");
    return;
  }
  const newDir = "./newFiles/";
  const newName = `newFile${fileNum}.json`;
  const newData = JSON.stringify(struct);
  fileNum += 1;
  console.log("1");
  console.dir(struct);

  fs.writeFile(newDir + newName, newData, (err) => {
    if (err) {
      console.log("There was an error writing your file!");
      console.error(err);
    } else {
      console.log(
        `Your file was added succesfully to the directory ${newDir} under name ${newName}`
      );
    }
  });
};
