import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import promiseMiddleware from 'redux-promise-middleware';
import DevTools from '../views/app/components/DevTools';
import createReducer from './createReducer';

let enhancer = [applyMiddleware(promiseMiddleware())];
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  enhancer = [
    ...enhancer,
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#])\b/
      )
    )
  ];
}

const composedEnhancer = compose(...enhancer);

/* eslint global-require: 0 */
export default function configureStore(initialState = {}) {
  const store = createStore(createReducer(), initialState, composedEnhancer);
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./createReducer', () =>
      store.replaceReducer(require('./createReducer').default)
    );
  }
  return store;
}

/* eslint no-param-reassign: 0 */
export const injectAsyncReducer = (store, name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};
