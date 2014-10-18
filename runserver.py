from noisytweets import app
from noisytweets import socketio

app.config['DEBUG'] = True

socketio.run(app)
