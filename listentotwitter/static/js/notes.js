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
    if (instrument == 'piano') {
        return Math.round(((sentiment + 100) / 200) * 86) + 1;
    } else if (instrument == 'jake') {
        return Math.round(((sentiment + 100) / 200) * 14) + 1;
    }

    return 0;
}
