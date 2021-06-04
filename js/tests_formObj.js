"use strict";

const formNewObj = require("./src/formNewObj.js");

const fnReturns = (arg, val) => (arg() === val ? true : false);
const isEqual = (arg, val) => (arg === val ? true : false);
const isDataType = (arg, type) => (typeof arg === type ? true : false);
const isNumber = (arg) => (+arg ? true : false);

const testObj = {
  "20-20-20": { abc: () => 3 },
  "20:20:20": ["a = 2", "b = 3", "c = 4"],
  someInfo: { abc: "234" },
  key1: { inKey: { 3: 4 } },
  key2: { inKey2: { 3: 4 } },
  key3: { inKey2: { 3: "data" } },
  key4: { inKey2: { 3: 5 } },
  key5: { inData: { 3: 4 } },
  key6: { inKey2: { data: 4 } },
  key7: { inKey2: 4 },
  key8: 8,
  key9: 3,
  1: () => 4,
  [1]: 3,
  2: () => 3,
  3: "some data",
  4: 5,
  12: null,
  24: () => 3,
};

const fns1 = [
    [[isNumber, null, null, null], 0]
];
const fns2 = [
  [[isNumber, null, null, null], 0],
  [[isEqual, null, [3], null], 0],
];
const fns3 = [
    [[null, fnReturns, null, [3]], 0]
];
const fns4 = [
  [[null, isNumber, null, null], 0],
  [[null, isEqual, null, [5]], 0],
];
const fns5 = [
  [[isNumber, null, null, null], 0],
  [[null, isEqual, null, [5]], 0],
];
const fns6 = [
    [[isNumber, isNumber, null, null], 0]]
    ;
const fns7 = [
    [[isEqual, null, ["abc"], null], 1]
];
const fns8 = [
    [[null, isDataType, null, ["function"]], 1]
];
const fns9 = [
  [[null, isDataType, null, ["object"]], 0],
  [[isEqual, isDataType, ["inKey2"], ["object"]], 1],
  [[isEqual, null, [3], null], 2],
];
const fns10 = [
    [[null, null, null, null], 0]
];
const fns11 = [
    [[null, null, null, null], null]
];
const fns12 = [
    [[isNumber, null, null, null], null]
];
const fns13 = [
    [[isNumber, null, [1, 4], null], 0]
];
const fns14 = [
    [[isDataType, null, null, null], 0]
];
const fns15 = [
    [[isDataType, null, Symbol(4), null], 0]
];
const fns16 = [
    [[null, fnReturns, null, [8]], 0]
];
const fns17 = [
    [[isDataType, isDataType, ["string"], ["object"]], 0]
];

const tests = {
  test1: () => {
    console.log("\n1-----");
    console.log("Checking selection by key:\n");
    return formNewObj(testObj, fns1);
  },
  test2: () => {
    console.log("\n2-----");
    console.log("Checking selection by key after selection by key:\n");
    return formNewObj(testObj, fns2);
  },
  test3: () => {
    console.log("\n3-----");
    console.log("Checking selection by function:\n");
    return formNewObj(testObj, fns3);
  },
  test4: () => {
    console.log("\n4-----");
    console.log(
      "Checking selection by function after selection by function:\n"
    );
    return formNewObj(testObj, fns4);
  },
  test5: () => {
    console.log("\n5-----");
    console.log("Checking selection by function after selection by key:\n");
    return formNewObj(testObj, fns5);
  },
  test6: () => {
    console.log("\n6-----");
    console.log("Checking selection by function and key:\n");
    return formNewObj(testObj, fns6);
  },
  test7: () => {
    console.log("\n7-----");
    console.log(
      "Checking selection by key in deeper level of original object:\n"
    );
    return formNewObj(testObj, fns7);
  },
  test8: () => {
    console.log("\n8-----");
    console.log(
      "Checking selection by function in deeper level of original object:\n"
    );
    return formNewObj(testObj, fns8);
  },
  test9: () => {
    console.log("\n9-----");
    console.log(
      "Checking selection by function and key on different levels:\n"
    );
    return formNewObj(testObj, fns9);
  },
  test10: () => {
    console.log("\n10-----");
    console.log("Adding wrong data for checking functions:\n");
    return formNewObj(testObj, fns10);
  },
  test11: () => {
    console.log("\n11-----");
    console.log(
      "Adding wrong no data and no position for checking functions:\n"
    );
    return formNewObj(testObj, fns11);
  },
  test12: () => {
    console.log("\n12-----");
    console.log("Adding wrong no position for checking functions:\n");
    return formNewObj(testObj, fns12);
  },
  test13: () => {
    console.log("\n13-----");
    console.log("Adding arguments for function that uses no arguments:\n");
    return formNewObj(testObj, fns13);
  },
  test14: () => {
    console.log("\n14-----");
    console.log("Adding no arguments for function that uses arguments:\n");
    return formNewObj(testObj, fns14);
  },
  test15: () => {
    console.log("\n15-----");
    console.log(
      "Adding wrong type of arguments for function that uses arguments:\n"
    );
    return formNewObj(testObj, fns15);
  },
  test16: () => {
    console.log("\n16-----");
    console.log(
        "Testing when all data is correct but none is verified for selection:\n"
        );
    return formNewObj(testObj, fns16);
  },
  test16: () => {
    console.log("\n17-----");
    console.log("Testing when every function has its arguments:\n");
    return formNewObj(testObj, fns17);
  },
};

const launchTests = (tests) => {
  const keys = Object.keys(tests);
  console.log("\nLaunching tests of forming new object:");
  for (const key of keys) {
    try {
      const obj = tests[key]();
      console.log("Received object:");
      console.dir(obj);
    } catch (err) {
      console.log("There was an error launching the test!");
      console.error(err);
      continue;
    }
  }
};

launchTests(tests);
