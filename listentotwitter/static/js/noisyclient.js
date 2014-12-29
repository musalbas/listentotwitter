NoisyClient = {
    keyword: null,
    socket: null,
    onTweetFunctions: [],
    onKeywordsSyncedFunctions: [],

    addOnTweetFunction: function(f) {
        this.onTweetFunctions[this.onTweetFunctions.length] = f;
    },

    addOnKeywordsSyncedFunction: function(f) {
        this.onKeywordsSyncedFunctions[this.onKeywordsSyncedFunctions.length] = f;
    },

    ping: function() {
        this.socket.emit('ping', {'keyword': this.keyword});
    },

    runOnTweetFunctions: function(tweet) {
        for (var i = 0; i < this.onTweetFunctions.length; i++) {
            this.onTweetFunctions[i](tweet);
        }
    },

    runOnKeywordsSyncedFunctions: function(result) {
        for (var i = 0; i < this.onKeywordsSyncedFunctions.length; i++) {
            this.onKeywordsSyncedFunctions[i](result);
        }
    },

    setup: function(keyword, websocketUrl) {
        this.keyword = keyword;

        if (typeof websocketUrl === 'undefined') {
            websocketUrl = 'http://' + document.domain + ':' + location.port;
        }

        this.socket = io.connect(websocketUrl);

        this.ping();
        window.setInterval(function() {
            NoisyClient.ping();
        }, 10000);

        this.socket.on('tweet', function(tweet) {
            NoisyClient.runOnTweetFunctions(tweet);
        });

        this.socket.on('keywords_synced', function(result) {
            NoisyClient.runOnKeywordsSyncedFunctions(result);
        });
    },
};
