from flask import abort
from flask import redirect
from flask import render_template

from listentotwitter import app
from listentotwitter.config import WEBSOCKET_URL
from listentotwitter.keywordsmanager import keyword_test


@app.route('/')
def view_index():
    return render_template('index.html')


@app.route('/keyword/<keyword>')
def view_keyword(keyword):
    keyword_lower = keyword.lower()
    if keyword_lower != keyword:
        return redirect('/keyword/' + keyword_lower, code=302)
    elif keyword_test(keyword):
        return render_template('keyword.html', is_listening=True, keyword=keyword, websocket_url=WEBSOCKET_URL)
    else:
        return render_template('bad-keyword.html', keyword=keyword)
