// Very basic, Kishore to improve :)

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/transporter-collection');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const TenantSchema = new Schema({ id: ObjectId, name: String });
const Tenant = mongoose.model('tenant', TenantSchema);

export const get = (id) => Tenant.findById({ _id: id }, (err, doc) => doc);
export const create = (tenant) => Tenant.create(tenant, (err, doc) => doc);
export const update = (id, tenant) => Promise.resolve(
  Tenant.update({ _id: id }, tenant, (err, doc) => doc)
);
export const del = (id) => Tenant.remove({ _id: id }, (err, doc) => doc);
