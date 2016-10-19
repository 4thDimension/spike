import { Router } from 'express';
import * as service from './property.service';

const getProperty = (req, res) => (
  service.get(req.params.id)
    .then(doc => res.json(doc))
);

const createProperty = (req, res) => (
  service.create(req.body).then((doc) => res.json(doc))
);
const updateProperty = (req, res) => (
  service.update(req.params.id, req.body)
    .then((doc) => res.json(doc))
);

const deleteProperty = (req, res) => (
  service.del(req.params.id)
    .then((doc) => res.json(doc))
);

const router = Router();

router.get('/:id', getProperty);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default {
  rootUrl: "property",
  router
};
