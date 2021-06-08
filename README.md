# Course-Work-OP
Course Work for OP, 2nd semester of year 1 at KPI

## Topic

Analogue of a student diary with scheduler and system of data pick

## General work scheme

A function calls reading of .json is added to the scheduler. For this work .json file must be formatted the following way:
```
“date”: {”time”: {“contacts”: “data”}}
```
The function will be called  several times after same interval.

The data inside the file will be transformed into an object, a part of which information will be selected by certain attributes (must be formatted right in this case) and transferred from the original object to a new data structure. The newly picked data will form a new file of .json format.

## Implementation of Scheduler

Scheduler is a class with following public fields:

```javascript
this.task;
this.args;
this._active;
this._intervalId;
```
And its private fields:
```javascript
this._active;
this._intervalId;
```

It also has possible error collection and following methods:

№1)
```javascript
addTask(func, params)
```
Adds a task with its arguments if none currently exists. Uses help method
```javascript
_canAdd(func, params)
```

№2)
```javascript
runTask(interval, counter)
```
Runs added task within given interval certain amount of times. Uses help methods:
```javascript
_canRun(interval, counter)
```
To check if no task is currently running or if there is one to run. And also:
```javascript
_clearTask(intervalId) 
```
For clearing interval when the task execution has to stop.

№3)
```javascript
delTask() 
```
Deletes a task. Current task stops running.

№4
```javascript
_err(msg)
```
If any error occurs, this method will be called.

## Implementation of object sort

Object sort system has three main functions:

№1)
```javascript
formNewObject(struct, fns)
```
Accepts object and array as its arguments, array consists of other arrays that must look like this:
```javascript
[[fnForKey, fnForValue, argsFnForKey, argsFnForValue], positionInObject]
```
Function returns newly selected object.

№2)
```javascript
selectByFns(origin, fn, pos)
```
Accordingly to given position, deepens into object 'original' or calls next main function:

№3)
```javascript
isVerified(obj, key, fnKey, fnVal, argsKey, argsVal)
```
Defines whether the data will be added to the new object.

## File system

In current work file 'testFile.json' is accepted to later be sorted accordingly to the functions in 'fns.js'.
Newly received object is written intov directoty 'newFiles'.
This work has 2 copies of the same object under differently numbered names in this directory.

## Tests

There are tests for class Scheduler and object sort system.