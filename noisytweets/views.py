from noisytweets import app

@app.route('/')
def view_index():
    return "hello"
