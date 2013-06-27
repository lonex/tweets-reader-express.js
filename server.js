var connect = require('connect')
    , express = require('express')
		, RedisStore = require('connect-redis')(express)
		, config = require('./lib/config').config
    , port = (process.env.PORT || 8081);

//
// Redis client
// 
var REDIS_SERVER = config['REDIS_SERVER']
    , REDIS_PORT = config['REDIS_PORT']
    , redisStore = new RedisStore({host: REDIS_SERVER,
                            port: REDIS_PORT });	

//
// Setup Express
//
var server = express.createServer();
server.configure(function(){
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/views');
    server.use(express.logger({
	    format: ':remote-addr :referrer [:date] " :method :url HTTP/:http-version" :status :response-time ":user-agent"'}));
    server.use(express.bodyParser());
    server.use('/static', express.static(__dirname + '/static'));
		server.use(express.cookieParser());
		server.use(express.session({ secret: "this is cool", 
		                             store: redisStore
			                         }));
    server.use(server.router);
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

//
// Routes
//
require('./routes').set(server);

server.listen(port);

console.log('Redis server ' +config['REDIS_SERVER'] + ":"+config['REDIS_PORT']);
console.log('Listening on http://0.0.0.0:' + port );

