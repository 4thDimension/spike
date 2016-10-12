import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Router } from 'express';
import graphqlHTTP from 'express-graphql';
import { Tenant } from './tenant';

const router = Router();
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'NextHomeQuery',
    fields: {
      Tenant
    }
  })
});

router.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

export default router;
