'use strict';

const formNewObj = (obj, fns) => {
  return new Promise((resolve, reject) => {
    if (!canDoSelection(obj, fns))
      reject('Cannot do selection correctly with given data!');

    let iter = 0;
    let newObj = new Object(null);
    console.log('Starting selection of a new object:');
    for (const fn of fns) {
      if (newObj && Object.keys(newObj).length)
        newObj = selectByFns(newObj, ...fn);
      else newObj = selectByFns(obj, ...fn);

      console.log(`New object after iteration #${iter}:`);
      console.dir(newObj);
      iter++;
    }
    resolve(newObj);
  });
};

const canDoSelection = (obj, fns) => {
  if (!obj || typeof obj !== 'object') return false;
  if (!fns || !Array.isArray(fns)) return false;
  return true;
};

const selectByFns = (origin, fn, pos) => {
  if (!fn || !Array.isArray(fn)) {
    console.log('Can not start selecting data on current stage!');
    return origin;
  }

  let selection = new Object(null);
  const keys = Object.keys(origin);
  for (const key of keys) {
    selection[key] = addValue(origin, key, fn, pos);

    if (pos > 0) {
      if (!selection[key] || !Object.keys(selection[key]).length)
        delete selection[key];
    } else {
      if (!selection[key]) delete selection[key];
    }
  }
  return selection;
};

const addValue = (obj, key, fn, pos) => {
  if (typeof pos !== 'number' || pos < 0) {
    console.log('Position for selecting data was not set correctly!');
    return null;
  }

  if (pos > 0) {
    if (obj[key] && Object.keys(obj[key]).length)
      return selectByFns(obj[key], fn, pos - 1);
    else return null;
  } else {
    if (isVerified(obj, key, ...fn)) return obj[key];
    return null;
  }
};

const isVerified = (obj, key, fnKey, fnVal, argsKey, argsVal) => {
  if (!fnVal && !fnKey) {
    console.log('No parameters to verify your keys for selection by!');
    return false;
  }

  let flagKey = true;
  let flagVal = true;
  if (fnKey) {
    flagKey = paramValid(key, fnKey, argsKey) ? true : false;
  }
  if (fnVal) {
    flagVal = paramValid(obj[key], fnVal, argsVal) ? true : false;
  }
  return flagKey && flagVal ? true : false;
};

const paramValid = (obj, fn, args) => {
  try {
    if (fn.length > 1) {
      return fn(obj, ...args) ? true : false;
    } else {
      return fn(obj) ? true : false;
    }
  } catch (err) {
    console.log('There was an error verifying your data!');
    console.error(err);
    return false;
  }
};

module.exports = formNewObj;
