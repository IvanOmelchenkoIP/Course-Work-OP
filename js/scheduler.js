'use strict';

class Scheduler {
	constructor() {
		this.tasks = new Object(null);
		this.args = new Object(null);
		this.interval = 0;
		this.counter = 0;
		this.del = false;
		this._active = false;
		this._intervalId = null;
		
		this._errorMsg = {
			taskExists: `There is already a task.
			\nIf you want to add new task, use method deleleTask() to delete existing one!`,
			isActive: `There is already a task running!
			\nWait until the task is finished or use deleteTask() method to stop current one!`,
			noCounter:`The amount of needed times to repeat the task was not specified!`,
			noInterval: `Interval for repeating the task was not specified!`,
			noTask: `The task does not exist!
			\nBefore running a task add one!`,
			noArgs: `The arguments for the function executed are not specified!
			\nAdd arguments before running the task!`,
			deleleTask: `There is no task to delete!`,
			deleteArgs: `There are no arguments to delete!`,
		}
	}
	
	addTask(name, callback, args) {
		if (this.tasks) return this._err(this._errorMsg[taskExists]);
		
		this.task[name] = callback;
		this.args[name] = args;
	}
  
	runTask(args) {
		if (this._active) return this._err(this._errorMsg[isActive]);
		if (this.counter < 1) return this._err(this._errorMsg[noCounter]);
		if (this.interval <= 0) return this._err(this._errorMsg[noInterval]);
		if (!this.tasks[name]) return this._err(this._errorMsg[noTask]);
		if (!this.args[name]) return this._err(this._errorMsg[noArgs]);
		
		this._active = true;		
		this._IntervalId = setInterval( () => {
			if (this.counter >= 0) {
				tasks(...args);
				this.counter -= 1;
			}
		}, this.interval);
      this.clearCurrentTask();
	}
  
	clearCurrentTask() {
		if (this._intervalId) {
			console.log('Current task has ended its execution.');
			this._active = false;
			clearInterval(this._intervalId);
		}
	}
  
	taskParameters(interval, times = null, del = true) {
		this.interval = interval;
		
		if (times || times >-1) this.counter = times;
		else this.counter = -1;
	
		this.del = del;
	}
  
	deleteTask(name) {
		if (!this.task) return this._err(this._errorMsg[deleteTask]);
		if (!this.args) return this._err(this._errorMsg[deleteArgs]);
		if (this._intervalId) this.clearInterval(_this.intervalId);
		
		delete this.tasks[name];
		delete this.args[name];
	}
  
	_err(msg = null) {
		if (msg) {
			console.log(`Your commands could not be executed. Incorrections found: 
			\n${msg}`);
		}
	}
}