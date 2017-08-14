// @flow
'use strict';
const https = require('https');
const socialNetwork = require('./socialNetwork.js');

var log = require("./logger.js");
    
const apiVersion = 5.67;
const apiUrl = 'https://api.vk.com/method';

class vk extends socialNetwork {
  apiKey: string;

  constructor(key: string, appId: number) {
    super('vk');
 
    if (key == '') {
      throw 'Empty key found!. Please go to https://oauth.vk.com/authorize?client_id=' + appId + '&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=wall,offline&response_type=token&v=' + apiVersion + '&state=' + Date.now() + ' and put access_token from url string to config file!';
    }
  
    this.apiKey = key;
  }

  _formatRequest(request:{}): string {
    var requestArray = [];
    for (var k in request) {
      requestArray.push(k + '=' + request[k]);
    }
    return requestArray.join('&');
  }

  request(method: string, parameters: {}, eventName?: string) {
    var self = this;
    var requestArray = {
      'v': apiVersion,
      'access_token': this.apiKey,
    };
    for (var k in parameters) {
      requestArray[k] = parameters[k];
    }
    var requestString = this._formatRequest(requestArray);
    https.get(apiUrl+'/'+method+'?'+requestString, function(res) {
      var apiResponse = '';
      res.setEncoding('utf8');

      res.on('data', function(chunk) {
        apiResponse += chunk;
      });

      res.on('end',  function() {
        var o = JSON.parse(apiResponse);
        if (eventName) {
          self.emit(eventName, o);
        } else { 
          self.emit('done:' + method, o);
        }
      });
    });
  }
}

module.exports = vk;
