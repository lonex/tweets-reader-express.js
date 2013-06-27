# Tweet Reader

## Pre-requisite

  * Node
  * Redis

## Usage

Start server
	> node server.js

Open any browser to hit [this page](http://localhost:8081/tweets)
Type any topic you want to follow in the Topic field(s), then press 'Get tweets' button to retrieve the tweets.
Sample topic like hashtag (_#Node_) and mention (_@DiscoverMag_).
Each field holds exactly one topic.     
    
Command line
	> node ./bin/run_reader.js -t "#thisHash OR @thatMention"
	

## Limitations

  * The app doesn't use the twitter streaming api, instead it uses the search API. Thus it has [rate limit](https://dev.twitter.com/docs/rate-limiting)
