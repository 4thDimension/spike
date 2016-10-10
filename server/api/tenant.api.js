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

// curl 'http://localhost:8080/api/tenant/<id>'
const getTenant = (req, res) => {
  Tenant.find({ _id: req.params.id }, (err, doc) => {
    return res.json(doc);
  });
};

// curl -H "Content-Type: application/json" -XPOST 'http://localhost:8080/api/tenant' -d '{ "name": "test" }'
const createTenant = (req, res) => {
  Tenant.create(req.body, (err, doc) => {
    return res.json(doc);
  });
};

// curl -H "Content-Type: application/json" -XPUT 'http://localhost:8080/api/tenant/<id>' -d '{ "name": "testy" }'
const updateTenant = (req, res) => {
  Tenant.update({ _id: req.params.id }, req.body, (err, doc) => {
    return res.json(doc);
  });
};

// curl -H "Content-Type: application/json" -XDELETE 'http://localhost:8080/api/tenant/<id>'
const deleteTenant = (req, res) => {
  Tenant.remove({ _id: req.params.id }, (err, doc) => {
    return res.json(doc);
  });
};

router.get('/:id', getTenant);
router.post('/', createTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default router;
