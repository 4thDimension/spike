import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import glob from 'glob';
import path from 'path';

const schemaFields = () => {
  const fields = glob.sync('./*.js', { cwd: path.join(__dirname, 'objects') });
  return fields.map((fieldPath) => require(`./objects/${fieldPath}`).default)
                .filter((field) => field.name && field.object)
                .reduce((acc, field) => ({ ...acc, [field.name]: field.object }), {});
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'NextHomeQuery',
    fields: schemaFields()
  })
});

export default schema;
