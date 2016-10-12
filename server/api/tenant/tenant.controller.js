// Very basic, Kishore to improve :)

import * as service from './tenant.service';

import { Router } from 'express';

const router = Router();

const getTenant = (req, res) => service.get(req.params.id).then((doc) => res.json(doc));
const createTenant = (req, res) => service.create(req.body).then((doc) => res.json(doc));
const updateTenant = (req, res) => service.update(req.params.id, req.body).then((doc) => res.json(doc));
const deleteTenant = (req, res) => service.del(req.params.id).then((doc) => res.json(doc));

router.get('/:id', getTenant);
router.post('/', createTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default {
  rootUrl: "tenant",
  router
};
