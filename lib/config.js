var tUtil = require('./tiny-util');

//
// Environemnt specific glabal configuration
//

var env = process.env.NODE_ENV || 'development';
var config = {};

if (env == 'development') {
	config['REDIS_SERVER'] = 'localhost';
	config['REDIS_PORT'] = 6379;
	config['LOG_FILE'] = 'dev.log'; // This needs to be the same as what's defined in log4js.json
	config['consumer_key'] = 'YOUR_CONSUMER_KEY',
  config['consumer_secret'] = 'YOUR_CONSUMER_SECRET',
  config['access_token_key'] = 'YOUR_ACCESS_TOKEN_KEY',
  config['access_token_secret'] = 'YOUR_ACCESS_TOKEN_SECRET'
} else if (env == 'production') {
	config['REDIS_SERVER'] = 'YOUR_PROD_REDIS_SERVER';
	config['REDIS_PORT'] = 6379;
	config['LOG_FILE'] = 'prod.log'; // This needs to be the same as what's defined in log4js.json
	config['consumer_key'] = 'YOUR_CONSUMER_KEY',
  config['consumer_secret'] = 'YOUR_CONSUMER_SECRET',
  config['access_token_key'] = 'YOUR_ACCESS_TOKEN_KEY',
  config['access_token_secret'] = 'YOUR_ACCESS_TOKEN_SECRET'
}
exports.config = config;

//
// Logger
//
var logDir = __dirname + '/../logs';
tUtil.mkdirSync(logDir, 0755);
var logFile = logDir + '/' + config['LOG_FILE'];
tUtil.createFileSync(logFile);

var log4js = require('log4js')();
log4js.configure(__dirname + '/../log4js.json');
var logger = log4js.getLogger(env);
logger.write = logger.info;

exports.logger = logger;