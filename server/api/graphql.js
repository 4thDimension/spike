import express from 'express';
import * as tenantService from './tenant.service';
import graphqlHTTP from 'express-graphql';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLSchema } from 'graphql';

const router = express.Router();

const resolveTenant = (root, { id }) => tenantService.get(id).then((doc) => doc);

const TenantType = new GraphQLObjectType({
  name: "Tenant",
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    types: [TenantType],
    name: 'NextHomeQuery',
    fields: {
      Tenant: {
        type: TenantType,
        resolve: resolveTenant,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        }
      }
    }
  })
});

router.use('/', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

export default router;
