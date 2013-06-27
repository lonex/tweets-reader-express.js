var usage = ''
  + '\n'
  + '  Usage: node ./bin/run_reader.js [options]\n'
  + '\n'
  + '  Options:\n'
  + '    -t, --text <feed #hash or follow> Type your twitter topic, default to "#node"\n'
  + '    -h, --help                 help information\n'
  + '  E.g.\n'
  + '    node ./bin/run_reader.js -t "#thisHash OR @thatMention"'
  ;

var args = process.argv.slice(2)
   , text = '#node'
   , NR_REPEATS = 2
   , count = 0;

while (args.length) {
  var arg = args.shift();
  switch (arg) {
    case '-h':
    case '--help':
    case '-?':
    case '?':
      print(usage);
      break;
    case '-t':
    case '--text':
      if (args.length)
        (text = args.shift());
      break;
    default:
      print("wrong argument");
  }
}

var reader = require('../lib/reader')
   , sys = require('sys');

process.on('SIGINT', function () {
    console.log(' SIGINT exiting...');
    process.exit(0);
});

console.log("Follow this on Twitter [" + text + "]");

(function start() {
	reader.search(text, function(data) {
		data.results.reverse().forEach(function(tweet) {
	    sys.puts(sys.inspect(tweet));		  	
		})
		if (count<NR_REPEATS) {
			count++;
			setTimeout(function() {
				start();
			}, 1000);
		}
	})	
})();

//
// Print message
// 
function print(str) {
  console.error(str);
  process.exit(1);
}
