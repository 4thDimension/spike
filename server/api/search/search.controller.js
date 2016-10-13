// Very basic, Kishore to improve :)

import * as search from './search.service';

import { Router } from 'express';

const searchTenant = (req, res) => search.tenantById(req.params.id).then((doc) => res.json(doc));

const router = Router();

router.get('/tenant/:id', searchTenant);

export default {
  rootUrl: "search",
  router
};
