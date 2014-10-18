NoisyClient = {
    socket: null,
    keyword: null,

    setup: function(keyword) {
        this.keyword = keyword;

        this.socket = io.connect('http://' + document.domain + ':' + location.port);

        this.ping();
    },

    ping: function() {
        this.socket.emit('ping', {'keyword': this.keyword});
    }
};
