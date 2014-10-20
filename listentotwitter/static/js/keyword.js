var sentimentQueue = [];

function sentimentToCssClass(sentiment) {
    var cssClass;

    if (sentiment <= -60) {
        cssClass = 'super-danger';
    } else if (sentiment <= -20) {
        cssClass = 'danger';
    } else if (sentiment <= 20) {
        cssClass = '';
    } else if (sentiment <= 60) {
        cssClass = 'success';
    } else {
        cssClass = 'super-success';
    }

    return cssClass;
}

function processSentimentQueue() {
    var averageSentiment = 0;
    var newSound = false;

    if (sentimentQueue.length != 0) {
        newSound = true;
        var sum = 0;

        for (var i = 0; i < sentimentQueue.length; i++) {
            sum += sentimentQueue[i];
        }

        averageSentiment = Math.round(sum / sentimentQueue.length);

        sentimentQueue = [];
    }

    if (newSound) {
        var note = Math.round(((averageSentiment + 100) / 200) * 86) + 1;
        playNote(note);
    }

    setTimeout(function() {
        processSentimentQueue();
    }, 150);
}

function processTweet(tweet) {
    // Add tweet sentiment to the sentiment queue
    sentimentQueue.push(tweet['sentiment']);

    // Add tweet to the tweets table
    $('<tr class="' + sentimentToCssClass(tweet['sentiment']) + '"><td>' + tweet['tweet'] + '</td><td>' + tweet['sentiment'] + '</td></tr>').prependTo('#tweets-table tbody');
    $('#tweets-table').find('tbody').find('tr').slice(20, 21).remove();
}

function startNoisyClient(keyword, websocketUrl) {
    NoisyClient.setup(keyword, websocketUrl);
    
    NoisyClient.addOnTweetFunction(function(tweet) {
        processTweet(tweet);
    });

    processSentimentQueue();
}
