
var TweetClass = function(containerDiv, serverUrl) {
	this.containerDiv = containerDiv;
	this.serverUrl = serverUrl;
};

TweetClass.prototype = {
  getContainerDiv: function() {
		return this.containerDiv;
  },

  getLastTweet: function() {
		return this.lastTweet;
  },
 
  setLastTweet: function(rawTweet) {
	  this.lastTweet = rawTweet;
  },

	getServerUrl: function() {
		return this.serverUrl;
	},
	
	compareTweet: function(another) {
	  var d1 = new Date(another.created_at).getTime();
	  var d2 = new Date(this.lastTweet.created_at).getTime();
	  if (d1 > d2)
	    return 1;
	  else if (d1 == d2 && another.from_user_id != this.lastTweet.from_user_id)
	    return 1;
	  else 
	    return -1;
	},
	
	createTweetDiv: function(tweet) {
	  var tweet_div = $('<div class="tweet">');
	  var image = $(document.createElement("img"))
	                 .attr({ src: tweet.profile_image_url, title: 'avatar' })
	                 .addClass("profile_image")
	                 .click(function(){
	                    // Do something
	                 });
	  var href1 = $(document.createElement('a'))
	                 .attr({ target: '_blank', href: 'http://twitter.com/' + tweet.from_user});
	  var href2 = href1.clone();
	  var left = $('<div class="left">').append(href1.append(image));
	  var name = $('<div class="name">').append(href2.append(document.createTextNode(tweet.from_user)));
	  var text = $('<div class="text">').html(this.translateTweetText(tweet.text));
	  var date = $('<div class="date">').append(document.createTextNode(this.translateTweetTime(tweet.created_at)));
	  var right = $('<div class="right">');
	  right.append(name).append(text).append(date);
	  tweet_div.append(left);
	  tweet_div.append(right);
	  return tweet_div;
	},
	
	translateTweetTime: function(time) {
		return time.replace(/\+\d{1,4}/, '');
	},
	
  translateTweetText: function(text){
		var s = text.replace(/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig,
                         '<a class="link" href="$1" target="_blank">$1</a>');
    s = s.replace(/(\s|^)@([\w\-]+)/g,
                  '$1<a class="at_tag" href="http://twitter.com/#!/$2" target="_blank">@$2</a>');
    s = s.replace(/(\s|^)#([\w\-]+)/g,
                  '$1<a class="hash_tag" href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
    return s;
  }
}

var loop=0;

function loadTweets() {
  try {
    var terms = selectedTopics || []; 
    var queryData = { terms: ''};
    queryData.terms = encodeURIComponent(terms.join(" OR "));

    $.getJSON(myTweet.getServerUrl(), queryData, function(tweets) {
	    if (tweets) {
	      var results = tweets.results.reverse();
        if (typeof results != 'undefined' && results.length > 0) {
          $.each(results, function(i, item) {
            if (myTweet.compareTweet(item) > 0) {
              var tweet_div = myTweet.createTweetDiv(item);
              setTimeout(function() {
	              tweet_div.prependTo(myTweet.getContainerDiv());
	              tweet_div.effect("highlight", {}, 1000);
              }, 100);
              myTweet.setLastTweet(item);
            } 
          });
        } else {
          //console.log("No new tweets...");
        }

        setTimeout('loadTweets()', 1000);
      } // if (tweets)
    });
  } catch (e) {
    loop++;
    if (loop < 20)
      setTimeout('loadTweets()', 1000);
  }
}
