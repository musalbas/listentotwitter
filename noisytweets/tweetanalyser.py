class TweetAnalyser:

    def __init__(self, socketio):
        self._socketio = socketio

    def incoming_tweet(self, tweet):
        print tweet
