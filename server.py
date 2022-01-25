from dotenv import load_dotenv
from flask import Flask, jsonify, request
from datetime import datetime, timedelta
import grequests
import os

load_dotenv()

LAT = 53.4371319
LON = -2.2718197

OPEN_WEATHER_API_KEY = os.environ.get("OPEN_WEATHER_API_KEY")

app = Flask(__name__, static_folder="build", static_url_path="")


@app.route("/", methods=["GET"])
def index():
    return app.send_static_file("index.html")


def make_request(days_ago):
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
    return grequests.get(url, params=params)


@app.route("/api/weatherdata", methods=["GET"])
def get_weatherdata():
    num_days = int(request.args.get("numDays", default="1"))
    rs = (make_request(days_ago) for days_ago in range(num_days, 0, -1))
    results = grequests.map(rs)
    data = []
    for result in results:
        dict = result.json()
        data = data + dict["hourly"]
    return jsonify(data)
