"use strict";

const formNewObj = (struct, fns) => {
  if (!canStartSelect(struct, fns)) {
    console.log("Cannot do selection correctly with given data!");
    return null;
  }

  console.log("\nStarting selection data for a new object:");
  let newObj = null;
  for (const fn of fns) {
    newObj = newObj ? selectByFns(newObj, ...fn) : selectByFns(struct, ...fn);

    console.log("\nNew object has been received:");
    console.dir(newObj);
  }
  console.log("Forming new object was finished.");
  return newObj;
};

const canStartSelect = (struct, fnArr) => {
  if (!struct || typeof struct !== "object") return false;
  if (!fnArr || !Array.isArray(fnArr)) return false;
  return true;
};

const selectByFns = (origin, fn, pos) => {
  if (!isSelectable(origin, fn, pos)) {
    console.log(
      `Can not start selecting data on current stage!
Processing to the next stage with originally given object...`
    );
    return origin;
  }

  const selection = new Object(null);
  const keys = Object.keys(origin);
  if (!keys) return null;
  for (const key of keys) {
    if (pos > 0) {
      selection[key] =
        origin[key] &&
        typeof origin[key] === "object" &&
        Object.keys(origin[key]).length
          ? selectByFns(origin[key], fn, pos - 1)
          : null;

      !selection[key] || !Object.keys(selection[key]).length
        ? delete selection[key]
        : console.log(
            `Key ${key} with value ${selection[key]} has been added to the new object`
          );
    } else {
      if (isAdded(origin, key, ...fn)) selection[key] = origin[key];
    }
  }
  return selection;
};

const isSelectable = (origin, fn, pos) => {
  if (!origin || typeof origin !== "object") return false;
  if (!fn || !Array.isArray(fn)) return false;
  if (typeof pos !== "number" || pos < 0) return false;
  return true;
};

const isAdded = (obj, key, fnKey, fnVal, argsKey, argsVal) => {
  if (!fnVal && !fnKey) {
    console.log("No parameters to verify your keys for selection by!");
    return false;
  }

  let flagKey = true;
  let flagVal = true;
  try {
    if (fnKey) {
      checkCorrect(key, fnKey, argsKey) ? (flagKey = true) : (flagKey = false);
    }
    if (fnVal) {
      checkCorrect(obj[key], fnVal, argsVal)
        ? (flagVal = true)
        : (flagVal = false);
    }
  } catch (err) {
    console.log("There was an error launching verification of your data!");
    console.error(err);
    return false;
  }
  return flagKey && flagVal ? true : false;
};

const checkCorrect = (obj, fn, args) => {
  try {
    if (fn.length > 1) {
      return fn(obj, ...args) ? true : false;
    } else {
      return fn(obj) ? true : false;
    }
  } catch (err) {
    console.log("There was an error verifying your data!");
    console.error(err);
    return false;
  }
};

module.exports = formNewObj;