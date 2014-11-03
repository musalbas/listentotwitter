var sentimentQueue = [];

var graphPlot;
var graphPoints = [];
var graphTotalPoints = 300;

var emojiCodepoints = []
var maxEmojis = 12;

for (var i = 0; i < graphTotalPoints; i++) {
    graphPoints.push(0);
}

function addEmoji(codepoint) {
    emojiCodepoints.unshift(codepoint.toLowerCase());
    console.log(emojiCodepoints);

    if (emojiCodepoints.length > maxEmojis) {
        emojiCodepoints = emojiCodepoints.slice(0, maxEmojis-1);
    }

    var html = '';

    for (var i = 0; i < emojiCodepoints.length; i++) {
        html = html + '<img src="/static/img/3rdparty/twitter_emojis/' + emojiCodepoints[i] + '.png">';
    }

    $('#emoji-stream').html(html);
}

function pointsToSeries(points) {
    var series = [];

    for (var i = 0; i < points.length; i++) {
        series.push([i, points[i]]);
    }

    return series;
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

    updateGraph(averageSentiment);

    setTimeout(function() {
        processSentimentQueue();
    }, 150);
}

function processTweet(tweet) {
    sentimentQueue.push(tweet['sentiment']);

    $('<tr class="' + sentimentToCssClass(tweet['sentiment']) + '"><td>' + tweet['tweet'] + '</td><td>' + tweet['sentiment'] + '</td></tr>').prependTo('#tweets-table tbody');
    $('#tweets-table').find('tbody').find('tr').slice(10, 11).remove();

    for (var i = 0; i < tweet['emoji_codepoints'].length; i++) {
        addEmoji(tweet['emoji_codepoints'][i]);
    }
}

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

function startNoisyClient(keyword, websocketUrl) {
    NoisyClient.setup(keyword, websocketUrl);
    
    NoisyClient.addOnTweetFunction(function(tweet) {
        processTweet(tweet);
    });

    graphPlot = $.plot('#mood-graph', [pointsToSeries(graphPoints)], {
        series: {
            shadowSize: 0,
        },
        yaxis: {
            min: -100,
            max: 100,
        },
        xaxis: {
            show: false,
        },
    });

    processSentimentQueue();
}

function updateGraph(point) {
    graphPoints = graphPoints.slice(1);
    graphPoints.push(point);
    graphPlot.setData([pointsToSeries(graphPoints)]);
    graphPlot.draw();
}
