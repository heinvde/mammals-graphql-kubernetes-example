## Mammals GraphQL API

This service contains the exposed graphql API that connects to the other services

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

### Linting and testing

Intall packages for Node 12.x

```bash
$ npm i
```

Run linting

```bash
npm run prettier
npm run esline
```

### Running the service locally

Make sure the other services has been built and published

 - [Database service](../../services//mammals/db/README.md#building-and-publishing)
 - [Query service](../../services//mammals/query-mammals/README.md#building-and-publishing)
 - [Mutate service](../../services//mammals/mutate-mammals/README.md#building-and-publishing)

You can run a local version by spinning up the docker container after it has been built.

```bash
$ docker-compose up
```

You can access the graphql playground from `http://localhost:8077/graphql` in a web browser
You can access the graphql API by making a POST request to `http://localhost:8077/graphql`

### Testing the service

Tests has not (and probably will not because this is just for showcasing) been implemented.