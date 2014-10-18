from noisytweets import keywordsmanager
from noisytweets import socketio

@socketio.on('ping')
def handle_ping(keyword):
    keywordsmanager.ping_keyword(keyword)
    join_room(keyword)
