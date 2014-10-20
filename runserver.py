from listentotwitter import app
from listentotwitter import socketio
from listentotwitter.config import FLASK_DEBUG
from listentotwitter.config import HTTP_HOST
from listentotwitter.config import HTTP_PORT

app.config['DEBUG'] = FLASK_DEBUG   

socketio.run(app, host=HTTP_HOST, port=HTTP_PORT)
