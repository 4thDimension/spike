import express from 'express';
import jwt from 'express-jwt';

const router = express.Router();
const authCheck = jwt({
  secret: new Buffer('9lgbINHPJ1XJ1DGrRVZ6N6jbyX9gHmD0nNWkDyP3VrnYJGZog7wDLc1ixDMw0ptS', 'base64'),
  audience: 'b7Qfj5hASoI5m6RjYNZ7xC3yLpZrbtnv'
});

const jedis = [
  {
    id: 1,
    name: 'Luke Skywalker',
    image: 'http://localhost:7000/images/luke-skywalker.jpg'
  },
  {
    id: 2,
    name: 'Anakin Skywalker',
    image: 'http://localhost:7000/images/anakin-skywalker.png'
  },
  {
    id: 3,
    name: 'Yoda',
    image: 'http://localhost:7000/images/yoda.png'
  },
  {
    id: 4,
    name: 'Obi-Wan Kenobi',
    image: 'http://localhost:7000/images/obi-wan-kenobi.jpg'
  },
  {
    id: 5,
    name: 'Mace Windu',
    image: 'http://localhost:7000/images/mace-windu.jpg'
  }
];

router.get('/jedis', (req, res) => {
  const allJedis = jedis.map(jedi => ({ id: jedi.id, name: jedi.name }));
  res.json(allJedis);
});

router.get('/jedis/:id', authCheck, (req, res) => {
  res.json(jedis.filter(jedi => jedi.id === parseInt(req.params.id, 10))[0]);
});

export default router;

