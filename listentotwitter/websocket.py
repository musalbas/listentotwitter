from flask.ext.socketio import join_room

from listentotwitter import keywordsmanager
from listentotwitter import socketio


@socketio.on('ping')
def handle_ping(data):
    keywordsmanager.ping_keyword(data['keyword'])
    join_room(data['keyword'])
