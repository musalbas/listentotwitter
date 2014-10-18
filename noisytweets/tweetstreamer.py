class TweetStreamer():

    def __init__(self):
        self._keywords_tracking = []

    def update_keywords_tracking(self, keywords_tracking):
        self._keywords_tracking = keywords_tracking
