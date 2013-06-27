var reader = require('./lib/reader')
	  , logger = require('./lib/config').logger
	  , sys = require('sys')
	  , fs = require('fs')
	  , page
	  , debug = false;


function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

exports.set = function(server){
	server.get('/tweets', function(req, res){
    var terms = req.session.terms;
		if (terms && terms.length) {
	    logger.debug("Get terms in session: " + terms);
	    terms = terms.split(' OR ');
	  } else {
		  terms = [];
		  logger.debug("No terms in session");
   	}
		options = { streamUrl: '/stream', 
		            terms: terms};
		res.render('tweets_page', {locals: options});
	});

	server.get('/stream', function(req, res, next) {
		var terms = req.query.terms;
		if (terms && terms.length) {
			rawTerms = decodeURIComponent(terms);
			console.log("Store terms to session: " + rawTerms);
			req.session.terms = rawTerms;
			reader.search(rawTerms, function(data) {
			 	res.send(data);
			});
    }
    else {
 	    console.log("no terms...");
      res.send('', 200);
    }
	});

	server.get('/static/:file', function(req, res, next){
	  provider(req, res, next);
	});

	server.get('/500', function(req, res){
	  throw new Error('This is a 500 Error');
	});

	server.error(function(err, req, res, next){
    logger.error("::Server.error " + err);
	  if (err instanceof NotFound) {
      return res.render('not_found');
	  } else {
	    return res.render('error');
	  }
	});
};
