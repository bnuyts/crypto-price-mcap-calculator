import express from 'express';
import { getMarketData } from '../coingecko/api';

export const market = express.Router();

market.get('/', async (req, res) => {
  res.send((await getMarketData()).data);
});
