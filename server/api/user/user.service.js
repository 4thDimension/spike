import UserSchema from './user.schema';
import db from '../../core/db';

const User = db.model('User', UserSchema);

export const get = (id) => User.findById({ _id: id }, (err, doc) => doc);
export const create = (user) => {
  return User.create(user, (err, doc) => {
    return err;
  });

};
export const update = (id, user) => Promise.resolve(
  User.update({ _id: id }, user, (err, doc) => doc)
);

export const del = (id) => User.remove({ _id: id }, (err, doc) => doc);
