import { combineReducers } from 'redux';

const dummyReducer = (state = {}) => state;

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    dummyReducer,
    ...asyncReducers
  });
}
