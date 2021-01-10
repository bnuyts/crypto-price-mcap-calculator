import express from 'express';
import {
  getSimplePriceData,
  getMarketData,
  MarketData,
} from '../coingecko/api';

export const calc = express.Router();

const calculatePossibleMcap = (
  targetMcap: number = 1,
  tokenMcap: number,
  tokenPrice: number
): string => ((targetMcap / tokenMcap) * tokenPrice).toString();

calc.get('/:token', async (req, res) => {
  const compareTo = (req.query.compareto as string) || 'bitcoin';
  const { data: simplePriceData } = await getSimplePriceData([
    compareTo,
    req.params.token,
  ]);
  res.send(
    calculatePossibleMcap(
      simplePriceData[compareTo].usd_market_cap,
      simplePriceData[req.params.token].usd_market_cap,
      simplePriceData[req.params.token].usd
    )
  );
});

interface ExtendedMarketData extends MarketData {
  price_in_btc_mcap?: string;
  price_in_eth_mcap?: string;
}

calc.get('/', async (req, res) => {
  const { data: marketData } = await getMarketData();
  const btcData = marketData.find((md) => md.symbol === 'btc');
  const ethData = marketData.find((md) => md.symbol === 'eth');
  marketData.forEach((emd: ExtendedMarketData) => {
    emd.price_in_btc_mcap = calculatePossibleMcap(
      btcData?.market_cap,
      emd.market_cap,
      emd.current_price
    );
    emd.price_in_eth_mcap = calculatePossibleMcap(
      ethData?.market_cap,
      emd.market_cap,
      emd.current_price
    );
  });
  res.send(marketData);
});
