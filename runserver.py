from listentotwitter import app
from listentotwitter import socketio
from listentotwitter.config import FLASK_DEBUG
from listentotwitter.config import FLASK_HOST
from listentotwitter.config import FLASK_PORT

app.config['DEBUG'] = FLASK_DEBUG   

socketio.run(app, host=FLASK_HOST, port=FLASK_PORT)
