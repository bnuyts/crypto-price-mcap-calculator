import express from 'express';
import { getCoinList } from '../coingecko/api';

export const coin = express.Router();

coin.get('/', async (req, res) => {
  res.send((await getCoinList()).data);
});
