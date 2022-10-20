## Tinybackpack GraphQL API

This service contains the exposed graphql API that connects to the other services

### Requirements

  - Docker
  - Docker-compose

### Building

Intall packages for Node 12.x

```bash
$ npm i
```

Run linting

```bash
npm run prettier
npm run esline
```

Build and tag the image

```bash
$ docker-compose build
```

### Running the service locally

Make sure the other services has been built, in the root folder run

```bash
$ ./build-images.sh
```

You can run a local version by spinning up the docker container after it has been built.

```bash
$ docker-compose up
```

You can access the graphql playground from `http://localhost:8077/graphql` in a web browser
You can access the graphql API by making a POST request to `http://localhost:8077/graphql`

### Testing the service

Tests has not (and probably will not because this is just for showcasing) been implemented.