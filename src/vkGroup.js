// @flow
'use strict';
var log = require("./logger.js");
var vkApi = require('./vk.js');
const socialNetwork = require('./socialNetwork.js')

class vkGroup extends vkApi {
  gid: number;
  key: string;
  
  constructor(key: string, gid: number) {
    super(key);
    this.gid = gid;
  }

  get(destinations: Array<socialNetwork>) {
    log.write('Will get data from '+ this.gid);

    this.on('done:wall.get', function(_o) {
       log.write('Got response!');
       log.write(_o);
       log.write('Will write to: ');
       log.write(destinations);
       throw "Not yet implemented";
    });
    this.request('wall.get', {'owner_id': this.gid});
  }

  put(data: Array<mixed>) {
    throw "Not yet implemented";
  }
}
module.exports = vkGroup;