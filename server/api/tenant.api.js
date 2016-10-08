// Very basic, Kishore to improve :)

import express from 'express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/transporter-collection');

const router = express.Router();
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const TenantSchema = new Schema({ id: ObjectId, name: String });
const Tenant = mongoose.model('tenant', TenantSchema);

// curl 'http://localhost:8080/api/tenant/test'
const getTenant = (req, res) => {
  Tenant.find({ name: req.params.name }, (err, doc) => {
    return res.json(doc);
  });
};

// curl -H "Content-Type: application/json" -XPOST 'http://localhost:8080/api/tenant' -d '{ "name": "test" }'
const createTenant = (req, res) => {
  Tenant.create(req.body, (err, doc) => {
    return res.json(doc);
  });
};

// curl -H "Content-Type: application/json" -XPUT 'http://localhost:8080/api/tenant/test' -d '{ "name": "testy" }'
const updateTenant = (req, res) => {
  Tenant.update({ name: req.params.name }, req.body, (err, doc) => {
    return res.json(doc);
  });
};

// curl -H "Content-Type: application/json" -XDELETE 'http://localhost:8080/api/tenant/test'
const deleteTenant = (req, res) => {
  Tenant.remove({ name: req.params.name }, (err, doc) => {
    return res.json(doc);
  });
};

router.get('/:name', getTenant);
router.post('/', createTenant);
router.put('/:name', updateTenant);
router.delete('/:name', deleteTenant);

export default router;
