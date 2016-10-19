import { Router } from 'express';
import * as service from './tenant.service';

const getTenant = (req, res) => (
  service.get(req.params.id)
    .then(doc => res.json(doc))
);

const createTenant = (req, res) => (
  service.create(req.body).then((doc) => res.json(doc))
);

const updateTenant = (req, res) => (
  service.update(req.params.id, req.body)
    .then((doc) => res.json(doc))
);

const deleteTenant = (req, res) => (
  service.del(req.params.id)
    .then((doc) => res.json(doc))
);

const router = Router();

router.get('/:id', getTenant);
router.post('/', createTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default {
  rootUrl: "tenant",
  router
};
