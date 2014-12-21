var sentimentQueue = [];

var graphPlot;
var graphPoints = [];
var graphTotalPoints = 300;

var emojiCodepoints = []
var maxEmojis = 12;

var instrument = '';
var interval = 0;

for (var i = 0; i < graphTotalPoints; i++) {
    graphPoints.push(0);
}

function addEmoji(codepoint) {
    emojiCodepoints.unshift(codepoint.toLowerCase());

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
        playSentiment(averageSentiment, instrument);
    }

    updateGraph(averageSentiment);

    setTimeout(function() {
        processSentimentQueue();
    }, interval);
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

function setInstrument(newInstrument) {
    instrument = newInstrument;

    switch (instrument) {
        case 'piano':
            interval = 150;
            break;
        case 'jake':
            interval = 800;
            break;
    }

    if (!(!$.cookie('instrument') && newInstrument == 'piano')) {
        $.cookie('instrument', newInstrument);
    }

    $('#instrument-select').val(newInstrument);
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

$(document).ready(function() {
    if (!$.cookie('instrument')) {
        setInstrument('piano');
    } else {
        setInstrument($.cookie('instrument'));
    }

    $('#instrument-select').change(function() {
        setInstrument($('#instrument-select').val());
    });
});
