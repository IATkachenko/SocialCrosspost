// @flow
'use strict';
const log = require('./logger.js');
const socialNetwork = require('./socialNetwork.js');

class social {
  constructor(networkName: string, appId: number, appKey: string, id: number) {
    var result: socialNetwork;
    switch (networkName) {
      case 'vk':
        var vkGroup = require('./vkGroup.js');
        result = new vkGroup(appKey, id);
        break;
    }
    return result;
  }
}

module.exports = social;
