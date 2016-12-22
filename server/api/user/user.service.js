import UserSchema from './user.schema';
import db from '../../core/db';

const User = db.model('user', UserSchema);

export const get = (id) => User.findById({ _id: id }, (err, doc) => doc);
export const create = (user) => User.create(user, (err, doc) => doc);
export const update = (id, user) => Promise.resolve(
  User.update({ _id: id }, user, (err, doc) => doc)
);

export const del = (id) => User.remove({ _id: id }, (err, doc) => doc);
