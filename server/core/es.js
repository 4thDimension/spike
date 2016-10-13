import { Client } from 'elasticsearch';

const client = new Client({
  host: 'localhost:9200',
  log: 'trace'
});

export default client;
