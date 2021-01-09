import express, { response } from 'express';
import { getSimplePriceData } from '../coingecko/api';

export const calc = express.Router();

const calculatePossibleMcap = (
  btcMcap: number,
  tokenMcap: number,
  tokenPrice: number
): string => ((btcMcap / tokenMcap) * tokenPrice).toString();

calc.get('/:token', async (req, res) => {
  const { data: simplePriceData } = await getSimplePriceData([
    'bitcoin',
    req.params.token,
  ]);
  res.send(
    calculatePossibleMcap(
      simplePriceData.bitcoin.usd_market_cap,
      simplePriceData[req.params.token].usd_market_cap,
      simplePriceData[req.params.token].usd
    )
  );
});
