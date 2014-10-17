from noisytweets import socketio

@socketio.on('ping')
def handle_ping(keyword):
    pass
