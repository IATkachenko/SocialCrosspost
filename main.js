var commandLine = require('commander');
var log = require('./lib/logger.js');
var configFile = require('./lib/config.js');
 
commandLine
  .version('0.1.0')
  .option('-c, --config <file>', 'Config file', 'config.json')
  .parse(process.argv);
 
var config = new configFile(commandLine.config).get();

var crosspost;
for (crosspost of config.crossPost) {

  log.write(crosspost.from);
  log.write(crosspost.to);
 
}
