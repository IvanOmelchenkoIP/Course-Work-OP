'use strict';

const fs = require('fs');

const fnArr = require('./src/fns.js');
const Scheduler = require('./src/scheduler.js');

const getObjByFormat = require('./src/processByFormat.js');
const formNewObj = require('./src/formNewObj.js');

let fileNum = 0;
const fileName = 'testFile.json';

const interval = 500;
const timeCounter = 2;
const schedule = new Scheduler();

const processData = (fileName, fns) => {
  const coding = 'utf-8';
  const newDir = './newFiles/';

  readData(fileName, coding)
    .then((data) => {
      console.log('Your file was been read. Starting processing...');
      return getObjByFormat(data, fileName);
    })
    .then((obj) => {
      console.log('An object from your file was received:');
      console.dir(obj);
      console.log('\nForming new file...');
      return formNewObj(obj, fns);
    })
    .then((newObj) => {
      console.log('\nNew object was selected:');
      console.dir(newObj);

      const newName = `newFile${fileNum}.json`;
      fileNum++;

      console.log('Writing new file with received data...');
      return newFile(newObj, newDir, newName);
    })
    .then((msg) => {
      console.log(msg);
    })
    .catch((err) => {
      console.log('\nThere was an error processing your data!');
      console.error(err);
    });
};

const readData = (fileName, coding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, coding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const newFile = (obj, newDir, newName) => {
  return new Promise((resolve, reject) => {
    const str = stringifyNewObj(obj);
    if (!str) reject('There is no data to write in new file!');

    fs.writeFile(newDir + newName, str, (err) => {
      if (err) reject(err);
      else
        resolve(
          `The file ${newName} was written successfully into directory ${newDir}!`
        );
    });
  });
};

const stringifyNewObj = (obj) => {
  return !obj || !Object.keys(obj).length ? null : JSON.stringify(obj);
};

schedule.addTask(processData, [fileName, fnArr]);
schedule.runTask(interval, timeCounter - 1);
