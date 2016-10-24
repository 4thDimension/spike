import schema from './schema';
import { Router } from 'express';
import graphqlHTTP from 'express-graphql';

const router = Router();

router.use('/', graphqlHTTP({
  schema,
  graphiql: process.NODE_ENV !== 'production'
}));

export default router;
