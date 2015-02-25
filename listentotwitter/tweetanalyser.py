from textblob import TextBlob

from listentotwitter.emoji import extract_emojis


def _extract_tweet_emojis_codepoints(tweet):
    codepoints = []

    for emoji in extract_emojis(tweet):
        if emoji['twitter_img'] and '-' not in emoji['unified']:
            codepoints.append(emoji['unified'])

    return codepoints


def _in_tweet(tweet, keyword):
    if keyword == 'hacklondon':
        if keyword in tweet:
            return True

    strings = [keyword]

    if keyword[0] != '#':
        strings.append('#' + keyword)

    for s in strings:
        if tweet.startswith(s + ' ') or ' ' + s + ' ' in tweet or tweet.endswith(' ' + s):
            return True

    return False


class TweetAnalyser:

    def __init__(self, socketio):
        self._socketio = socketio

        self._keywords_tracking = []

    def incoming_tweet(self, tweet):
        for keyword in self._keywords_tracking:
            if _in_tweet(tweet.lower(), keyword.lower()):
                sentiment = int(TextBlob(tweet).sentiment.polarity * 100)
                emoji_codepoints = _extract_tweet_emojis_codepoints(tweet)

                tweet_data = {
                    'tweet': tweet,
                    'sentiment': sentiment,
                    'emoji_codepoints': emoji_codepoints,
                }

                self._socketio.emit('tweet', tweet_data, room=keyword)

    def update_keywords_tracking(self, keywords_tracking):
        self._keywords_tracking = keywords_tracking
