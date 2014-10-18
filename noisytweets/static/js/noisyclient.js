NoisyClient = {
    socket: null,

    setup: function() {
        this.socket = io.connect('http://' + document.domain + ':' + location.port)
    }
}
