Listen to Twitter
===============

**Listen to Twitter** is a Python2 web application that allows you to convert the sentiment of any topic into a unique musical melody in real-time. The happier the general discussion, the higher the pitch of each note; the more tweets there are, the faster the notes play.

A live version is available at [listentotwitter.com](http://listentotwitter.com).

Python dependencies
-

The application has the following Python dependencies, which can be installed via pip:

* [flask-socketio](https://pypi.python.org/pypi/Flask-SocketIO)
* [textblob](https://pypi.python.org/pypi/textblob)
* [tweepy](https://pypi.python.org/pypi/tweepy)

Setup notes
-

If you'd like to setup your own copy of the application, following these instructions:

1. Install the above Python dependencies.
2. Clone the repository.
3. Copy `listentotwitter/config.py.default` to `listentotwitter/config.py`.
4. Edit the `TWITTER_*` variables in `listentotwitter/config.py` with your [Twitter API](https://apps.twitter.com/) keys.
5. Edit the `HTTP_*` variables in `listentotwitter/config.py` with the host and port that the web server should bind to.
6. Run `python runserver.py`.
7. The web server should now be running and accessible from your web browser.

Credits
-

Initially created by [Mustafa Al-Bassam](https://musalbas.com), [Mark Ormesher](http://markormesher.co.uk/), [Fares Alaboud](http://faresalaboud.me/) and [Kristin Kasavetova](http://krisi.me/) as [Noisy Tweets](https://github.com/markormesher/NoisyTweets) at [MLH](https://mlh.io/) Launch Hack.

[![](http://listentotwitter.com/static/img/3rdparty/c_mini_5.gif)](http://kopimi.co/) [![](http://listentotwitter.com/static/img/3rdparty/datalove-s3.png)](http://datalove.me)
