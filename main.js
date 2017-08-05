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
  var destinations = [];
  
  for (var dst in crosspost["to"]) {
    for (var dstId of crosspost["to"][dst]) {
      var dstObject = new socialFile(dst, config["auth"][dst][dstId]["id"], config["auth"][dst][dstId]["key"], dstId); 
      destinations.push(dstObject);
    }
  }

  for (var source in crosspost["from"]) {
    for (var sourceId of crosspost["from"][source]) {
      var sourceObject = new socialFile(source, config["auth"][source][sourceId]["id"], config["auth"][source][sourceId]["key"], sourceId); 
      sourceObject.get(destinations);
    }
  }
}
