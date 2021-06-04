"use strict";

const isDate = (str) => {
  const typePunct1 = ".";
  const typePunct2 = "-";
  const punctArr = [typePunct1, typePunct2];
  return isDateTimeFormat(str, punctArr) ? true : false;
};
const isTime = (str) => {
  const typePunct1 = ":";
  const punctArr = [typePunct1];
  return isDateTimeFormat(str, punctArr) ? true : false;
};
const isDateTimeFormat = (str, typePuncts) => {
  const rxPunct = /\W+/g;
  const rxNum = /\d+/g;

  const puncts = str.match(rxPunct);
  const nums = str.match(rxNum);

  if (!puncts) return false;
  if (!nums) return false;
  if (puncts.length !== nums.length - 1) return false;

  for (const num of nums) {
    if (!(+num)) {
      return false;
    }
  }
  for (const punct of puncts) {
    let tmpCondition = false;
    for (const typePunct of typePuncts) {
      if (!punct) tmpCondition = true;
      else if (punct == typePunct) {
        tmpCondition = true;
        break;
      }
    }
    if (!tmpCondition) return false;
  }
  return true;
};
const isInList = (val, list) => {
  for (const obj of list) if (val == obj) {
    console.log(val);
    return true
  };
  return false;
};
const isNumber = (arg) => (+arg ? true : false);

const list = ["person1", "person2", "person3"];
const fnArr = [
  [[isDate, null, null, null], 0],
  [[isTime, null, null, null], 1],
  [[isInList, isNumber, [list], null], 2],
];

module.exports = fnArr;