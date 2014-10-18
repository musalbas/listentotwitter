from noisytweets import app, socketio

app.config['DEBUG'] = True

socketio.run(app)
