import express from 'express';
import {
  getSimplePriceData,
  getMarketData,
  MarketData,
} from '../coingecko/api';

export const calc = express.Router();

const isStableCoin = (symbol: string) =>
  ['usdt', 'busd', 'usdc', 'tusd', 'frax', 'lusd'].some((s) => s === symbol);

const getFractionSize = (number: number) => {
  const fractionCapture = /(?<=\.).*/;
  const capture = fractionCapture.exec(number.toString());
  if (capture) {
    return capture[0].length;
  }
  return undefined;
};

const formatLocale = (
  number: number,
  maximumFractionDigits: number = 0
): string =>
  '$' +
  number.toLocaleString('en', {
    maximumFractionDigits,
    useGrouping: true,
  });

const calculatePossibleMcap = (
  targetMcap: number = 1,
  tokenMcap: number,
  tokenPrice: number
): string =>
  formatLocale(
    (targetMcap / tokenMcap) * tokenPrice,
    getFractionSize(tokenPrice)
  );

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
  formatted_price?: string;
  price_in_btc_mcap?: string;
  price_in_eth_mcap?: string;
}

calc.get('/', async (req, res) => {
  const { data: marketData } = await getMarketData();
  const btcData = marketData.find((md) => md.symbol === 'btc');
  const ethData = marketData.find((md) => md.symbol === 'eth');
  marketData.forEach((emd: ExtendedMarketData) => {
    emd.formatted_price = formatLocale(emd.current_price);
    if (!isStableCoin(emd.symbol)) {
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
    }
  });
  res.send(marketData);
});
