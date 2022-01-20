#!/bin/sh
source venv/bin/activate

PORT=${PORT:-5000}

exec gunicorn -b :$PORT server:app
