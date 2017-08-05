// @flow
'use strict';
var log = require("./logger.js");
class social {
  network: string;

  constructor(network: string) {
    this.network = network;
    switch (network) {
      default:
        log.write('Using default network! It MUST raise an error!!!');
        break
    }
  }
  
  get(id: string, data: Array<mixed>) {
    log.write('Abstract getter called for ' + id + ' from ' + this.network);
  }
 
  put(id: string, data: Array<mixed>) {
    log.write("Abstract putter called for id " + id + ' from ' + this.network);
  }
}
module.exports = social;
