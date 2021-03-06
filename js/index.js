"use strict";

const fs = require("fs");
const processByFormat = require("./src/processByFormat.js");
const Scheduler = require("./src/scheduler.js");
const fnArr = require("./src/fns.js");

let fileNum = 0;
const interval = 500;
const timeCounter = 2;
const fileName = "testFile.json";
const schedule = new Scheduler();

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

schedule.addTask(processData, [fileName, fnArr]);
schedule.runTask(interval, timeCounter-1);
