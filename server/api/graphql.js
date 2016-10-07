import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const router = express.Router();
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello Next Home!'
};

router.use('/', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

export default router;
