# Description

A little web app with the following features:

* Backend is Python / Flask
* Frontend is TypeScript / React
* Deployment to Heroku as a Docker container via GitHub Actions
* Display historical weather data in a visx chart

# Running locally

In order to run locally, you first need to create a `.env` file:

```
FLASK_APP=server.py
OPEN_WEATHER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Running locally in development mode

```
# Run the flask app to serve out the web api
flask run

# Run the web development server to serve out the React app
# Web api calls will be proxied to the flask app (due to the "proxy" setting in "package.json")
npm run start

# Open the web app in a web browser
open http://localhost:3000
```

## Running the Docker image locally

```
# Build the Docker image
docker build --tag flask-and-react .

# Run the Docker image in a container
docker run --rm --env-file .env --publish 5000:5000 --name flask-and-react --detach flask-and-react

# Open the web app in a web browser
open http://localhost:5000

# View the output logged by the flask app running in the Docker container
docker logs flask-and-react

# Stop the Docker container
docker stop flask-and-react
```

# Links

* [Create React App](https://create-react-app.dev/)
* [Welcome to Flask &#8212; Flask Documentation (2.0.x)](https://flask.palletsprojects.com/en/2.0.x/)
* [Flask Web Development, 2nd Edition](https://learning.oreilly.com/library/view/flask-web-development/9781491991725/)
* [Weather API - OpenWeatherMap](https://openweathermap.org/api)
* [Container Registry & Runtime (Docker Deploys)](https://devcenter.heroku.com/articles/container-registry-and-runtime)
* [Build, Push and Release a Docker container to Heroku](https://github.com/marketplace/actions/build-push-and-release-a-docker-container-to-heroku)
* [visx | visualization components](https://airbnb.io/visx)
