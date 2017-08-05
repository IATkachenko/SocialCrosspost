// @flow

'use strict';
var log = require("./logger.js");

class config {
  config: { };
  file: string;
  constructor(file: string) {
    this.config = {}; 
    this.file = file;
    this.load();
  }

  load() {
    log.write('Loading config from file: "'+this.file+'"');
    var fs = require('fs');
    this.config = JSON.parse(fs.readFileSync(this.file, 'utf8'));
  }
  
  show() {
    log.write(this.config);
  }

  get() {
    return this.config;
  }
}


//Logger should be one, so export class here
module.exports = config;
