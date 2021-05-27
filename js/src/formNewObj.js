"use strict";

const getNewObj = (struct, fnArr) => {
  if (!isProcessable(struct, fnArr)) return;
  const newObj = objByFns(struct, fnArr);
  return newObj;
};

const isProcessable = (struct, fnArr) => {
  if (!struct || typeof struct !== "object") return false;
  if (!fnArr || !Array.isArray(fnArr)) return false;
  return true;
};

const objByFns = (struct, fns) => {
  let obj = new Object(null);
  for (const fn of fns) {
    obj ? process(obj, null, ...fn) : process(struct, obj, ...fn);
  }
  return obj;
};

const process = (origin, newObj, fn, pos = null) => {
  if (typeof pos !== "number" || pos < 0) return;
  if (!fn || !origin) return;

  const keys = Object.keys(origin);
  for (const key of keys) {
    if (pos > 0) {
      if (!origin[key]) return;
      newObj[key] = process(origin[key], newObj[key], fn, pos - 1);
      if (!newObj[key]) delete newObj[key];
    } else {
      if (isValid(origin[key], key, ...fn)) {
        newObj[key] = origin[key];
        coinsole.dir(newObj);
      } else {
        newObj[key] = null;
      }
    }
  }
  return newObj;
};

const isValid = (
  store,
  key,
  fnName = null,
  fnVal = null,
  argsName = null,
  argsVal = null
) => {
  if (!fnName && !fnVal) {
    console.log("Error");
    return false;
  }
  if (fnName) {
    if (!isFitting(key, fnName, argsName)) {
      return false;
    }
  }
  if (fnVal) {
    if (!isFittting(store, fnVal, argsVal)) {
      return false;
    }
  }

  return true;
};

const isFitting = (obj, fn, args) => {
  if (typeof fn !== "function" || !fn) return false;
  try {
    if (fn.length > 1)
      if (fn(obj, ...args)) return true;
      else if (fn(obj)) return true;
  } catch (err) {
    console.log(err);
    return false;
  }
  return false;
};

module.exports = getNewObj;
