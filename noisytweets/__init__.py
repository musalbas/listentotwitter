from flask import Flask
from flask.ext.socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

from noisytweets.keywordsmanager import KeywordsManager

keywordsmanager = KeywordsManager()

import noisytweets.views
import noisytweets.websocket
