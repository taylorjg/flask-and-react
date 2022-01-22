from flask import Flask, jsonify
from datetime import datetime, timedelta
import urllib.request
import os
import json

LAT = 53.4371319
LON = -2.2718197

OPEN_WEATHER_API_KEY = os.environ.get("OPEN_WEATHER_API_KEY")

app = Flask(__name__, static_folder="build", static_url_path="")


@app.route("/", methods=["GET"])
def index():
    return app.send_static_file("index.html")


def get_historical_data(days_ago):
    now = datetime.now()
    day_of_interest = now - timedelta(days=days_ago)
    dt = int(day_of_interest.timestamp())
    url = f"http://api.openweathermap.org/data/2.5/onecall/timemachine?lat={LAT}&lon={LON}&dt={dt}&units=metric&appid={OPEN_WEATHER_API_KEY}"
    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)
    return dict["hourly"]


@app.route("/weatherdata", methods=["GET"])
def get_weatherdata():
    data = []
    for days_ago in range(5, 0, -1):
        data = data + get_historical_data(days_ago)
    return jsonify(data)
