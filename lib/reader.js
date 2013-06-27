var twitter = require('twitter')
   , config = require('./config').config
   , logger = require('./config').logger;

var twit = new twitter({
  consumer_key: config['consumer_key'],
  consumer_secret: config['consumer_secret'],
  access_token_key: config['access_token_key'],
  access_token_secret: config['access_token_secret']
});


module.exports = twit;