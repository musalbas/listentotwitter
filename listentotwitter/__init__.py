from flask import Flask
from flask.ext.socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

from listentotwitter.keywordsmanager import KeywordsManager

keywordsmanager = KeywordsManager()

import listentotwitter.views
import listentotwitter.websocket
