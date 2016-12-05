import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createReducer from './createReducer';

/* eslint global-require: 0 */
export default function configureStore(initialState = {}) {
  const composedEnhancer = compose(
    applyMiddleware(promiseMiddleware(), thunk)
  );
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
