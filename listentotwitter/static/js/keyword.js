function processTweet(tweet) {
    // Add tweet to the tweets table
    $('<tr><td>' + tweet['tweet'] + '</td><td>' + tweet['sentiment'] + '</td></tr>').prependTo('#tweets-table tbody');
    $('#tweets-table').find('tbody').find('tr').slice(20, 21).remove();
}

function startNoisyClient(keyword) {
    NoisyClient.setup(keyword);
    
    NoisyClient.addOnTweetFunction(function(tweet) {
        processTweet(tweet);
    });
}
