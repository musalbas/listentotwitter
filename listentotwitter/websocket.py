from flask.ext.socketio import emit
from flask.ext.socketio import join_room

from listentotwitter import keywordsmanager
from listentotwitter import socketio
from listentotwitter.keywordsmanager import keyword_test


@socketio.on('ping')
def handle_ping(data):
    if not keyword_test(data['keyword']):
        return
    join_room(data['keyword'])
    result = keywordsmanager.ping_keyword(data['keyword'])

    if result:
        emit('keywords_synced', {'synced': True})
