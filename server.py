from flask import Flask, jsonify, request
from datetime import datetime, timedelta
from dotenv import load_dotenv
import requests
import os

load_dotenv()

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
    url = "http://api.openweathermap.org/data/2.5/onecall/timemachine"
    params = {
        "lat": LAT,
        "lon": LON,
        "dt": dt,
        "units": "metric",
        "appid": OPEN_WEATHER_API_KEY
    }
    r = requests.get(url, params=params)
    dict = r.json()
    return dict["hourly"]


@app.route("/api/weatherdata", methods=["GET"])
def get_weatherdata():
    num_days = int(request.args.get("numDays", default="1"))
    data = []
    for days_ago in range(num_days, 0, -1):
        data = data + get_historical_data(days_ago)
    return jsonify(data)
