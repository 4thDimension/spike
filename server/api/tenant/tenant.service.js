// Very basic, Kishore to improve :)

import db from '../../db';

import { Schema } from 'mongoose';

const TenantSchema = new Schema({ id: Schema.ObjectId, name: String });
const Tenant = db.model('tenant', TenantSchema);

export const get = (id) => Tenant.findById({ _id: id }, (err, doc) => doc);
export const create = (tenant) => Tenant.create(tenant, (err, doc) => doc);
export const update = (id, tenant) => Promise.resolve(Tenant.update({ _id: id }, tenant, (err, doc) => doc));
export const del = (id) => Tenant.remove({ _id: id }, (err, doc) => doc);
