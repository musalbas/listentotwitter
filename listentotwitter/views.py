import urllib

from flask import redirect
from flask import render_template
from flask import request

from listentotwitter import app
from listentotwitter.config import WEBSOCKET_URL
from listentotwitter.keywordsmanager import keyword_test


@app.errorhandler(404)
def view_404(e):
    keyword = request.path[1:]
    return render_template('pages/bad-keyword.html', keyword=keyword), 404


@app.route('/')
def view_index():
    return render_template('pages/index.html')


@app.route('/<keyword>')
def view_keyword(keyword):
    keyword_clean = keyword.lower().strip()
    if keyword_clean != keyword:
        return redirect('/' + urllib.quote(keyword_clean), code=302)
    elif keyword == 'hacklondon':
        return render_template('pages/hacklondon.html', is_listening=True, keyword=keyword, websocket_url=WEBSOCKET_URL)
    elif keyword_test(keyword):
        return render_template('pages/keyword.html', is_listening=True, keyword=keyword, websocket_url=WEBSOCKET_URL)
    else:
        return render_template('pages/bad-keyword.html', keyword=keyword), 404
