from flask import Flask
from flask.ext.socketio import SocketIO

from noisytweets.keywordsmanager import KeywordsManager

app = Flask(__name__)
socketio = SocketIO(app)
keywordsmanager = KeywordsManager()

import noisytweets.views
import noisytweets.websocket
