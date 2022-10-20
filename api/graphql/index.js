
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLError } = require('graphql');
const { root, schema } = require('./graphql/schema');
const { Context } = require('./libs/utils/context');
const { Request } = require('./libs/utils/request')
const cors = require('cors');

const print = (...m) => console.log(...m);

// Create context
const context = new Context({
  request: new Request(),
  logger: {
    print: print
  },
  config: {
    QUERY_MAMMALS_SERVICE_HOST: process.env.QUERY_MAMMALS_SERVICE_HOST,
    MUTATE_MAMMALS_SERVICE_HOST: process.env.MUTATE_MAMMALS_SERVICE_HOST
  }
});

// Create app and endpoints
const port = 8077;
const app = express();

app.use(cors())

app.use("/ping", (_, res) => res.send("pong"))

app.use("/graphql", graphqlHTTP({
  schema:    buildSchema(schema),
  rootValue: root,
  graphiql:  true,
  pretty:    true,
  context:   context,
  customFormatErrorFn: (err) => {
    console.error(err);
    if(err instanceof GraphQLError) {
      err.extensions = {
        statusCode: 400
      }

      return err;
    }

    return [
      { statusCode: 500, data: "Internal server error"}
    ]
  }
}))

app.listen(port);

console.log(`Graphql listening on port ${port}`);
