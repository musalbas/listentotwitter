function processTweet(tweet) {
    console.log(tweet);
}

function startNoisyClient(keyword) {
    NoisyClient.setup(keyword);
    
    NoisyClient.addOnTweetFunction(function (tweet) {
        processTweet(tweet);
    });
}
