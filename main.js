var commandLine = require('commander');
var log = require('./lib/logger.js');
var configFile = require('./lib/config.js');
var socialFile = require('./lib/social.js');
 
commandLine
  .version('0.1.0')
  .option('-c, --config <file>', 'Config file', 'config.json')
  .parse(process.argv);
 
var config = new configFile(commandLine.config).get();

for (var crosspost of config.crossPost) {
  var data2Repost = [];
  for (var source in crosspost["from"]) {
    var sourceObject = new socialFile(source); 
    for (var sourceId of crosspost["from"][source]) {
      data2Repost.push(sourceObject.get(sourceId, data2Repost));
    }
  }

  for (var dst in crosspost["to"]) {
    var dstObject = new socialFile(dst);
    for (var dstId of crosspost["to"][dst]) {
      dstObject.put(dstId, data2Repost);
    }
  }
}
