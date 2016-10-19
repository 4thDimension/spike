import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import * as propertyService from '../api/property/property.service';

const resolve = (_, { id }) => propertyService.get(id).then((doc) => doc);

export const PropertyType = new GraphQLObjectType({
  name: 'Property',
  fields: {
    _id: { type: GraphQLString },
    houseNo: { type: GraphQLString },
    Street: { type: GraphQLString },
    Suburb: { type: GraphQLString },
    city: { type: GraphQLString },
    latLon: { type: GraphQLString },
    ownerName: { type: GraphQLString },
    amenities: { type: new GraphQLList(GraphQLString) },
    ownerType: { type: GraphQLString },
    AgentCompany: { type: GraphQLString },
    availableDate: { type: GraphQLString },
    ownerRating: { type: GraphQLString },
    testimonial: { type: GraphQLString },
    agreementDate: { type: GraphQLString },
    renewalDate: { type: GraphQLString },
    tenantId: { type: GraphQLString }
  }
});

export const Property = {
  type: PropertyType,
  resolve,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
};
