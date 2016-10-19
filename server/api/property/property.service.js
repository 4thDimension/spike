import PropertySchema from './propertySchema';
import db from '../../core/db';

const Property = db.model('property', PropertySchema);

export const get = (id) => (
  Property.findById({ _id: id }, (err, doc) => doc)
);

export const create = (property) => (
  Property.create(property, (err, doc) => doc)
);

export const update = (id, property) => (
  Promise.resolve(
    Property.update({ _id: id }, property, (err, doc) => doc)
  )
);

export const del = (id) => (
  Property.remove({ _id: id }, (err, doc) => doc)
);
