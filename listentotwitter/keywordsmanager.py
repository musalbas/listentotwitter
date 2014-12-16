import time

from listentotwitter import socketio
from listentotwitter.tweetanalyser import TweetAnalyser
from listentotwitter.tweetstreamer import TweetStreamer


def keyword_test(keyword):
    if len(keyword) >= 3 and len(keyword) <= 15:
        return True
    else:
        return False


class KeywordsManager:

    max_keywords = 100
    ping_timeout = 30

    def __init__(self):
        self._keywords_tracking = []
        self._keywords_info = {}

        self._tweetanalyser = TweetAnalyser(socketio)
        self._tweetstreamer = TweetStreamer(self._tweetanalyser.incoming_tweet)

    def _get_dead_keywords(self):
        dead_keywords = []

        for keyword in self._keywords_tracking:
            if time.time() - self._keywords_info[keyword]['last_ping'] > self.ping_timeout:
                dead_keywords.append(keyword)

        return dead_keywords

    def _purge_dead_keywords(self):
        for keyword in self._get_dead_keywords():
            self._untrack_keyword(keyword)

    def _untrack_keyword(self, keyword):
        if keyword in self._keywords_tracking:
            self._keywords_tracking.remove(keyword)
            del self._keywords_info[keyword]

    def ping_keyword(self, keyword):
        if keyword in self._keywords_tracking:
            self._keywords_info[keyword]['last_ping'] = time.time()
            return

        self._purge_dead_keywords()

        if len(self._keywords_tracking) >= self.max_keywords:
            return # TODO display error message to user

        self._keywords_tracking.append(keyword)
        self._keywords_info[keyword] = {}
        self._keywords_info[keyword]['last_ping'] = time.time()

        self._tweetstreamer.update_keywords_tracking(self._keywords_tracking)
        self._tweetanalyser.update_keywords_tracking(self._keywords_tracking)
