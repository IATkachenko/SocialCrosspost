// @flow
'use strict';
const log = require('./logger.js');
const socialNetwork = require('./socialNetwork.js');

class socialFactory {
  create(networkName: string, appId: number, appKey: string, id: number) {
    var result: socialNetwork;
    switch (networkName) {
      case 'vk':
        var vkGroup = require('./vkGroup.js');
        result = new vkGroup(appKey, appId, id);
        break;
    }
    return result;
  }

  
}
var sf = new socialFactory();
module.exports = sf;
