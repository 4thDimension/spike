import { Router } from 'express';
import * as search from './search.service';

const router = Router();

const searchTenant = (req, res) => (
  search.tenantById(req.params.id)
    .then((doc) => res.json(doc))
);

const searchProperty = (req, res) => {
  const { query, filters, options } = req.body;
  search.propertyByQuery(query, filters, options)
    .then((doc) => res.json(doc));
};

router.get('/tenant/:id', searchTenant);
router.post('/property', searchProperty);

export default {
  rootUrl: 'search',
  router
};
