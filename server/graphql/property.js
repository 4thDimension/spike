import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import * as tenantService from '../api/tenant/tenant.service';

const resolve = (_, { id }) => tenantService.get(id).then((doc) => doc);

export const TenantType = new GraphQLObjectType({
  name: 'Tenant',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

export const Tenant = {
  type: TenantType,
  resolve,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
};