import Home from './views/app/components/Home';
import App from './views/app/App';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const createRoutes = store => ({
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./views/search').default(store),
        require('./views/details').default(store)
      ]);
    });
  },
  indexRoute: {
    component: Home
  }
});

export default createRoutes;
