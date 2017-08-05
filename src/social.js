// @flow
'use strict';
var log = require("./logger.js");
class social {
  network: string;
  id: number;

  constructor(network: string, appId: number, appKey: string, id: number) {
    this.network = network;
    this.id = id;
    switch (network) {
      default:
        log.write('Using default network! It MUST raise an error!!!');
        break
    }
  }
  
  get(destinations: Array<mixed>) {
    log.write('Abstract getter called for ' + this.id + ' from ' + this.network);
  }
 
  put(data: Array<mixed>) {
    log.write("Abstract putter called for id " + this.id + ' from ' + this.network);
  }
}
module.exports = social;
