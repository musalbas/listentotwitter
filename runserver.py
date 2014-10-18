from noisytweets import app
from noisytweets import socketio
from noisytweets.config import FLASK_DEBUG
from noisytweets.config import FLASK_HOST
from noisytweets.config import FLASK_PORT

app.config['DEBUG'] = FLASK_DEBUG   

socketio.run(app, host=FLASK_HOST, port=FLASK_PORT)
