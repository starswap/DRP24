from flask import Flask
from whitenoise import WhiteNoise

app = Flask(__name__)

app.wsgi_app = WhiteNoise(app.wsgi_app, root="frontend/build")

@app.route("/api/test")
def hello_world():
    return "<p>Hello, World!</p>"