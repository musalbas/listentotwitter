from flask import render_template

from listentotwitter import app
from listentotwitter.config import WEBSOCKET_URL


@app.route('/')
def view_index():
    return render_template('index.html')


@app.route('/keyword/<keyword>')
def view_keyword(keyword):
    return render_template('keyword.html', keyword=keyword, websocket_url=WEBSOCKET_URL)
