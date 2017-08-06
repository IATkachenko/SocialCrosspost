// @flow
'use strict';
const eventEmitter = require('events');

var log = require("./logger.js");

class socialNetwork extends eventEmitter {
  network: string;

  constructor(network: string) {
    super();
    this.network = network;
  }
  
  get(destinations: Array<socialNetwork>) {
    throw 'Abstract getter called for from ' + this.network;
  }
 
  put(data: Array<mixed>) {
    throw 'Abstract putter called for from ' + this.network;
  }
}
module.exports = socialNetwork;
