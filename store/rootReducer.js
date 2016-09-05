import { combineReducers } from 'redux';
import { key as homeKey, reducer as homeReducer } from '../views/home/index';

export default combineReducers({
  [homeKey]: homeReducer
});
