#!/bin/sh
source venv/bin/activate

exec gunicorn -b :5000 server:app
