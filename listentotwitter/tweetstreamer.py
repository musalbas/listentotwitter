import threading
import json

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

from listentotwitter.config import TWITTER_CONSUMER_KEY
from listentotwitter.config import TWITTER_CONSUMER_SECRET
from listentotwitter.config import TWITTER_ACCESS_TOKEN
from listentotwitter.config import TWITTER_ACCESS_TOKEN_SECRET

class StreamHandler(StreamListener):
    
    def __init__(self, tweet_callback):
        self._tweet_callback = tweet_callback

        self._stop_signal = False

    def on_data(self, data):
        datadict = json.loads(data)

        if 'in_reply_to_status_id' in datadict:
            tweet = datadict['text']
            self._tweet_callback(tweet)

        return not self._stop_signal

    def on_error(self, status):
        print status

    def stop(self):
        self._stop_signal = True


class StreamThread(threading.Thread):

    def __init__(self, auth, tweet_callback, keywords_tracking):
        threading.Thread.__init__(self)

        self._keywords_tracking = keywords_tracking

        self._streamhandler = StreamHandler(tweet_callback)
        self._stream = Stream(auth, self._streamhandler)

    def run(self):
        self._stream.filter(track=self._keywords_tracking)

    def stop(self):
        self._streamhandler.stop()


class TweetStreamer():

    def __init__(self, tweet_callback):
        self._tweet_callback = tweet_callback

        self._auth = OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
        self._auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET)

        self._streamthread = None

    def update_keywords_tracking(self, keywords_tracking):
        if self._streamthread is not None:
            self._streamthread.stop()

        self._streamthread = StreamThread(self._auth, self._tweet_callback, keywords_tracking)
        self._streamthread.start()
