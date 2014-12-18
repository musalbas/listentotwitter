from flask import abort, render_template

from listentotwitter import app
from listentotwitter.config import WEBSOCKET_URL
from listentotwitter.keywordsmanager import keyword_test


@app.route('/')
def view_index():
    return render_template('index.html')


@app.route('/keyword/<keyword>')
def view_keyword(keyword):
    if keyword_test(keyword):
        return render_template('keyword.html', is_listening=True, keyword=keyword, websocket_url=WEBSOCKET_URL)
    else:
        abort(404)
