from flask import Flask, request, Response
from datetime import datetime, timedelta
import urllib.request
import os

LAT = 53.4371319
LON = -2.2718197

OPEN_WEATHER_API_KEY = os.environ.get("OPEN_WEATHER_API_KEY")

app = Flask(__name__, static_folder="build", static_url_path="")


@app.route("/", methods=["GET"])
def index():
    return app.send_static_file("index.html")


@app.route("/weatherdata", methods=["GET"])
def get_weatherdata():
    now = datetime.now()
    yesterday = now - timedelta(days=1)
    dt = int(yesterday.timestamp())
    url = f"http://api.openweathermap.org/data/2.5/onecall/timemachine?lat={LAT}&lon={LON}&dt={dt}&units=metric&appid={OPEN_WEATHER_API_KEY}"
    response = urllib.request.urlopen(url)
    data = response.read()
    return Response(data, content_type="application/json; charset=utf-8")
