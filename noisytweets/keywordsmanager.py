import time

from noisytweets import socketio
from noisytweets.tweetanalyser import TweetAnalyser
from noisytweets.tweetstreamer import TweetStreamer


class KeywordsManager:

    max_keywords = 100
    ping_timeout = 30

    def __init__(self):
        self._keywords_tracking = []
        self._keywords_info = {}

        self._tweetanalyser = TweetAnalyser(socketio)
        self._tweetstreamer = TweetStreamer(self._tweetanalyser.incoming_tweet)

    def _get_dead_keywords():
        dead_keywords = []

        for keyword in self._keywords_tracking:
            if time.time() - self._keywords_info['last_ping'] > ping_timeout:
                dead_keywords.append(keyword)

        return dead_keywords

    def _untrack_keyword(keyword):
        if keyword in self._keywords_tracking:
            self._keywords_tracking.remove(keyword)
            del self._keywords_info[keyword]

    def ping_keyword(self, keyword):
        if keyword in self._keywords_tracking:
            self._keywords_info[keyword]['last_ping'] = time.time()
            return

        # TODO: respect max_keywords

        self._keywords_tracking.append(keyword)
        self._keywords_info[keyword] = {}
        self._keywords_info[keyword]['last_ping'] = time.time()

        self._tweetstreamer.update_keywords_tracking(self._keywords_tracking)
        self._tweetanalyser.update_keywords_tracking(self._keywords_tracking)
