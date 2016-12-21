import { Router } from 'express';
import * as service from './user.service';

const getUser = (req, res) => (
  service.get(req.params.id)
    .then(doc => res.json(doc))
);

const createUser = (req, res) => (
  service.create(req.body).then((doc) => res.json(doc))
);

const updateUser = (req, res) => (
  service.update(req.params.id, req.body)
    .then((doc) => res.json(doc))
);

const deleteUser = (req, res) => (
  service.del(req.params.id)
    .then((doc) => res.json(doc))
);

const router = Router();

router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default {
  rootUrl: "user",
  router
};
