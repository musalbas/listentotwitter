from flask import render_template

from noisytweets import app

@app.route('/')
def view_index():
    return render_template('index.html')

@app.route('/keyword/<keyword>')
def view_keyword(keyword):
    return render_template('keyword.html', keyword=keyword)
