import createServer from './bootstrap/server.bootstrap';

const __PROD__ = process.env.NODE_ENV === 'production';
const __TEST__ = process.env.NODE_ENV === 'test';
const port = process.env.PORT || 8080;
const server = createServer(__PROD__ || __TEST__);

server.listen(port, '0.0.0.0', () => {
  console.log(`Running application on ${port}`);
});

module.exports = server;
