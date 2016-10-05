import { combineReducers } from 'redux';
import authReducer from '../views/auth/authReducer';

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    authReducer,
    ...asyncReducers
  });
}
