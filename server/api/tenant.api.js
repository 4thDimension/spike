// Very basic, Kishore to improve :)

import * as service from './tenant.service';

import express from 'express';

const router = express.Router();

// curl 'http://localhost:8080/api/tenant/<id>'
const getTenant = (req, res) => service.get(req.params.id).then((doc) => res.json(doc));

// curl -H "Content-Type: application/json" -XPOST 'http://localhost:8080/api/tenant' -d '{ "name": "test" }'
const createTenant = (req, res) => service.create(req.body).then((doc) => res.json(doc));

// curl -H "Content-Type: application/json" -XPUT 'http://localhost:8080/api/tenant/<id>' -d '{ "name": "testy" }'
const updateTenant = (req, res) => service.update(req.params.id, req.body).then((doc) => res.json(doc));

// curl -H "Content-Type: application/json" -XDELETE 'http://localhost:8080/api/tenant/<id>'
const deleteTenant = (req, res) => service.del(req.params.id).then((doc) => res.json(doc));

router.get('/:id', getTenant);
router.post('/', createTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default router;
