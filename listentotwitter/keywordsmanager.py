import time

from listentotwitter import socketio
from listentotwitter.data.topwords import topwords
from listentotwitter.tweetanalyser import TweetAnalyser
from listentotwitter.tweetstreamer import TweetStreamer


def keyword_test(keyword):
    if (keyword.lower().strip() != keyword
        or len(keyword) < 3
        or len(keyword) > 15
        or keyword in topwords):
        return False

    return True


class KeywordsManager:

    max_keywords = 100
    ping_timeout = 30
    compulsory_keywords = ('happy', 'hacklondonuk', 'hacklondon')

    def __init__(self):
        self._keywords_tracking = []
        self._keywords_info = {}

        self._tweetanalyser = TweetAnalyser(socketio)
        self._tweetstreamer = TweetStreamer(self._tweetanalyser.incoming_tweet, self._on_new_keywords)

        for keyword in self.compulsory_keywords:
            self.ping_keyword(keyword)

    def _get_dead_keywords(self):
        dead_keywords = []

        for keyword in self._keywords_tracking:
            if keyword not in self.compulsory_keywords and time.time() - self._keywords_info[keyword]['last_ping'] > self.ping_timeout:
                dead_keywords.append(keyword)

        return dead_keywords

    def _purge_dead_keywords(self):
        for keyword in self._get_dead_keywords():
            self._untrack_keyword(keyword)

    def _untrack_keyword(self, keyword):
        if keyword in self._keywords_tracking:
            self._keywords_tracking.remove(keyword)
            del self._keywords_info[keyword]

    def _on_new_keywords(self, new_keywords):
        for k in new_keywords:
            socketio.emit('keywords_synced', {'synced': True}, room=k)

    def ping_keyword(self, keyword):
        if keyword in self._keywords_tracking:
            self._keywords_info[keyword]['last_ping'] = time.time()
            return True

        self._purge_dead_keywords()

        if len(self._keywords_tracking) >= self.max_keywords:
            return # TODO display error message to user

        self._keywords_tracking.append(keyword)
        self._keywords_info[keyword] = {}
        self._keywords_info[keyword]['last_ping'] = time.time()

        self._tweetstreamer.update_keywords_tracking(self._keywords_tracking)
        self._tweetanalyser.update_keywords_tracking(self._keywords_tracking)
