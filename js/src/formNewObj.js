'use strict';

const formNewObj = (obj, fns) => {
  return new Promise((resolve, reject) => {
    if (!canStartSelect(obj, fns))
      reject('Cannot do selection correctly with given data!');

    let iter = 0;
    let newObj = null;
    console.log(
      `Starting selection of a new object (${fns.length} iterations):`
    );
    for (const fn of fns) {
      newObj = newObj ? selectByFns(newObj, ...fn) : selectByFns(obj, ...fn);

      console.log('\n');
      console.log(`New object after iteration #${iter}:`);
      console.dir(newObj);
      iter++;
    }
    resolve(newObj);
  });
};

const canStartSelect = (obj, fns) => {
  if (!obj || typeof obj !== 'object') return false;
  if (!fns || !Array.isArray(fns)) return false;
  return true;
};


const selectByFns = (origin, fn, pos) => {
  const selection = new Object(null);
  const keys = Object.keys(origin);
  if (!keys) return null;
  for (const key of keys) {
    if (pos > 0) {
      selection[key] =
        origin[key] &&
        typeof origin[key] === 'object' &&
        Object.keys(origin[key]).length
          ? selectByFns(origin[key], fn, pos - 1)
          : null;

      !selection[key] || !Object.keys(selection[key]).length
        ? delete selection[key]
        : console.log(
            `Key ${key} with value ${selection[key]} has been added to the new object`
          );
    } else {
      if (isVerified(origin, key, ...fn)) selection[key] = origin[key];
    }
  }
  return selection;
};


const isVerified = (obj, key, fnKey, fnVal, argsKey, argsVal) => {
  if (!fnVal && !fnKey) {
    console.log('No parameters to verify your keys for selection by!');
    return false;
  }

  let flagKey = true;
  let flagVal = true;
  if (fnKey) {
    paramValid(key, fnKey, argsKey) ? (flagKey = true) : (flagKey = false);
  }
  if (fnVal) {
    paramValid(obj[key], fnVal, argsVal)
      ? (flagVal = true)
      : (flagVal = false);
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
