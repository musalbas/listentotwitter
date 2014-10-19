var soundManagerReady = false;
var soundManagerPreferFlash = false;
var notes = {}

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

function playNote(note) {
    if (!soundManagerReady) {
        return;
    }

    if (!(note in notes)) {
        notes[note] = soundManager.createSound({
            url: '/static/sound/' + note + '.mp3',
        });
    }

    notes[note].play();
}
