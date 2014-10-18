class TweetAnalyser:

    def __init__(self, socketio):
        self._socketio = socketio

        self._keywords_tracking = []

    def incoming_tweet(self, tweet):
        for keyword in self._keywords_tracking:
            if keyword in tweet:
                self._socketio.emit('tweet', {'tweet': tweet}, room=keyword)

    def update_keywords_tracking(self, keywords_tracking):
        self._keywords_tracking = keywords_tracking
