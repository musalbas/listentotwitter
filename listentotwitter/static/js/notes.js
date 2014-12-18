var soundManagerReady = false;
var soundManagerPreferFlash = false;
var instruments = {}

if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    soundManagerPreferFlash = true;
}

soundManager.setup({
    url: '/static/swf/',
    preferFlash: soundManagerPreferFlash,
    flashVersion: 9,
    useHighPerformance: true,
    onready: function() {
        soundManagerReady = true;
    },
});

function playNote(note, instrument) {
    if (!soundManagerReady) {
        return;
    }

    if (!(instrument in instruments)) {
        instruments[instrument] = {}
    }

    if (!(note in instruments[instrument])) {
        instruments[instrument][note] = soundManager.createSound({
            url: '/static/sound/' + instrument + '/' + note + '.mp3',
        });
    }

    instruments[instrument][note].play();
}

function playSentiment(sentiment, instrument) {
    playNote(sentimentToNote(sentiment, instrument), instrument)
}

function sentimentToNote(sentiment, instrument) {
    var notesNum = 0;
    switch (instrument) {
        case 'piano':
            notesNum = 87;
            break;
        case 'jake':
            notesNum = 50;
            break;
    }

    return Math.round(((sentiment + 100) / 200) * (notesNum - 1) - 1) + 2;
}
