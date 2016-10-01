import { injectAsyncReducer } from '../../store/createStore';
import { key } from './searchConstants';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: 'messages',
    getComponents(location, cb) {
      require.ensure([
        './SearchContainer',
        './searchReducer'
      ], (require) => {
        const SearchContainer = require('./SearchContainer').default;
        const searchReducer = require('./searchReducer').default;

        injectAsyncReducer(store, key, searchReducer);
        cb(null, SearchContainer);
      });
    }
  };
}
