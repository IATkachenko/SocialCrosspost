// @flow
'use strict';
var log = require("./logger.js");
var vkApi = require('./vk.js');
const socialNetwork = require('./socialNetwork.js')

class vkGroup extends vkApi {
  gid: number;
  key: string;
  
  constructor(key: string, appId: number, gid: number) {
    super(key, appId);
    this.gid = gid;
  }

  get(destinations: Array<socialNetwork>) {
    log.write('Will get data from '+ this.gid);

    this.on('done:wall.get', function(posts) {
       var toRepost = [];
       for (var post of posts['response']['items']) {
         toRepost.push(this.filter(post));
       }
       
       for (var d of destinations) {
         d.put(toRepost);
       }
    });
    this.request('wall.get', {'owner_id': this.gid});
  }

  put(data: Array<mixed>) {
    throw "Not yet implemented";
  }
}
module.exports = vkGroup;
