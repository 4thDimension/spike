import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import * as tenantService from '../../api/tenant/tenant.service';

const resolve = (_, { id }) => tenantService.get(id).then((doc) => doc);

const TenantType = new GraphQLObjectType({
  name: 'Tenant',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const Tenant = {
  type: TenantType,
  resolve,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
};

export default {
  type: TenantType,
  object: Tenant,
  name: "Tenant"
};
