from textblob import TextBlob


class TweetAnalyser:

    def __init__(self, socketio):
        self._socketio = socketio

        self._keywords_tracking = []

    def incoming_tweet(self, tweet):
        for keyword in self._keywords_tracking:
            if keyword in tweet:
                sentiment = int(TextBlob(tweet).sentiment.polarity * 100)

                tweet_data = {
                    'tweet': tweet,
                    'sentiment': sentiment,
                }

                self._socketio.emit('tweet', tweet_data, room=keyword)

    def update_keywords_tracking(self, keywords_tracking):
        self._keywords_tracking = keywords_tracking
