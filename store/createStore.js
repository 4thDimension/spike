import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import DevTools from '../views/app/components/DevTools';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './rootReducer';

const enhancer = compose(
  applyMiddleware(promiseMiddleware()),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#])\b/
    )
  )
);

/* eslint global-require: 0 */
export default function configureStore(initialState) {
  let store = createStore(reducer, initialState);
  if (process.env.NODE_ENV !== 'production') {
    store = createStore(reducer, initialState, enhancer);
  }
  return store;
}
