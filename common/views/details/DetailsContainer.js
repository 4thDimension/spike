import { injectAsyncReducer } from '../../store/createStore';
import { key } from './detailsConstants';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: 'messages',
    getComponents(location, cb) {
      require.ensure([
        './detailsContainer',
        './detailsReducer'
      ], (require) => {
        const SearchContainer = require('./detailsContainer').default;
        const searchReducer = require('./detailsReducer').default;

        injectAsyncReducer(store, key, searchReducer);
        cb(null, SearchContainer);
      });
    }
  };
}
