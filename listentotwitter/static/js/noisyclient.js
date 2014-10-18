NoisyClient = {
    keyword: null,
    socket: null,
    onTweetFunctions: [],

    addOnTweetFunction: function(f) {
        this.onTweetFunctions[this.onTweetFunctions.length] = f;
    },

    ping: function() {
        this.socket.emit('ping', {'keyword': this.keyword});
    },

    runOnTweetFunctions: function(tweet) {
        for (var i = 0; i < this.onTweetFunctions.length; i++) {
            this.onTweetFunctions[i](tweet);
        }
    },

    setup: function(keyword) {
        this.keyword = keyword;

        this.socket = io.connect('http://' + document.domain + ':' + location.port);

        this.ping();
        window.setInterval(function() {
            NoisyClient.ping();
        }, 10000);

        this.socket.on('tweet', function(tweet) {
            NoisyClient.runOnTweetFunctions(tweet);
        });
    },
};
