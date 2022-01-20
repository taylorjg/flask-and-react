FROM node:14-slim as build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json .
COPY public public
COPY src src

RUN npm clean-install
RUN npm run build

FROM python:3.10-alpine

WORKDIR /app

COPY requirements.txt server.py boot.sh .
COPY --from=build /app/build static

RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt

ENV FLASK_APP server.py

ENTRYPOINT ["./boot.sh"]
