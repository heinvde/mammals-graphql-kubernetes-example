const fs = require("fs");

// Create graphql schema
const schema = fs.readFileSync("./graphql/schema.graphql", 'utf-8');

// Define root for graphql schema
const mammals = require("../libs/mammals/schema");

var root = {
  ...mammals
}

module.exports = {
  schema, root
}
