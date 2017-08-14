'use strict';
class logger {
  write(str) {
    console.log(new Date().toISOString() + ': '+ str);
  }
}

//Logger should be one, so export class here
var log = new logger();
module.exports = log;
