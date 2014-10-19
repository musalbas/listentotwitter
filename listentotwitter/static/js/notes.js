var soundManagerReady = false;
var notes = {}

soundManager.setup({
    url: '/static/swf/',
    preferFlash: false,
    onready: function() {
        soundManagerReady = true;
    }
});

function playNote(note) {
    if (!soundManagerReady) {
        return;
    }

    if (!(note in notes)) {
        console.log(note);
        notes[note] = soundManager.createSound({
            url: '/static/sound/' + note + '.mp3',
        });
    }

    notes[note].play();
}
