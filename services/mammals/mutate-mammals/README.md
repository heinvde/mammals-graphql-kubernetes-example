## Query Mammals Service

This is a simple service with a python app and nodejs validator responsible for mutating the mammal data in mongo.

### Requirements

 - Docker
 - Docker-compose

### Building and publishing

To build the image

```bash
$ ./build.sh
```

To publish the image

```bash
$ ./publish.sh
```

### Running the service

You can run a local version by spinning up the docker container. First make sure the database image has been built and published, see [here](../db/README.md#building-and-publishing).

Then build this container

```bash
$ docker-compose build
```

And then create the containers
```bash
$ docker-compose up
```

The you can access the service's API from `http://localhost:5001/`

### Testing the service

#### Testing the validator

Change directory into `validator/` and install dependencies (Uses NodeJS 12.x)
```
$ npm i
```

Run the tests after you have spinned up the service using docker compose
```
$ npm test
```

#### Testing the app

Change directory into `app/` and set up virtual environement
```bash
virtualenv venv -p python3.8
source venv/bin/activate
```

Install dependencies
```
$ pip install -r requirements.txt
```

You can run integration tests after you have spinned up the service using docker compose with pytest.

```bash
$ pytest
```