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

  filter(post: {}): {text?: string} {
    //This function gets all data from post and prepare it for repost
    
    var result = {};

    var map: {
      text?: {
        field: string,
        clean?: {}
      }
    };
    
    switch (this.network) {
      case 'vk': 
                 // what   where
        map = {
          'text': { 
            'field' : 'text',
            'clean' : {
              '\\\[.*?\\\|([^\\\]]*)\\\]' : '$1' 
            }
          }
        }
        break;
    }

    if (map) {
      for (var f in map) {
        if (post[map[f]['field']]) {
          var str = post[map[f]['field']];
          if (map[f]["clean"]) {
            for (var e in map[f]['clean']) {
              str = str.replace(new RegExp(e,'g'), map[f]['clean'][e]);
            }
          }
          result[f] = str;
        }
      }
    } else {
      throw 'I have no mapping for ' + this.network;
    }

    return result;
  }
}
module.exports = socialNetwork;
