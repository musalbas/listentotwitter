var soundManagerReady = false;

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

    var note = soundManager.createSound({
        url: '/static/sound/' + note + '.mp3',
    });
    note.play();
}
