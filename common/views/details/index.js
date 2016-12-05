import { injectAsyncReducer } from '../../store/createStore';
import { key } from './detailsConstants';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: 'details',
    getComponents(location, cb) {
      require.ensure([
        './DetailsContainer',
        './detailsReducer'
      ], (require) => {
        const DetailsContainer = require('./DetailsContainer').default;
        const detailsReducer = require('./detailsReducer').default;

        injectAsyncReducer(store, key, detailsReducer);
        cb(null, DetailsContainer);
      });
    }
  };
}
