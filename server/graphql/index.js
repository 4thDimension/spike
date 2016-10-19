import schema from './schema';
import { Router } from 'express';
import graphqlHTTP from 'express-graphql';

const router = Router();

router.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

export default router;
