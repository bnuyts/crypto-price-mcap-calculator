import axios, { AxiosResponse } from 'axios';

export interface SimplePrice {
  [k: string]: {
    usd: number;
    usd_market_cap: number;
  };
}

export interface Coin {
  [k: string]: {
    id: string;
    symbol: string;
    name: string;
  };
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
}

export const getSimplePriceData = (tokens: string[] = ['bitcoin']) =>
  axios.get<SimplePrice>(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokens.join(
      '%2C'
    )}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`
  );

export const getCoinList = () =>
  axios.get<Coin>('https://api.coingecko.com/api/v3/coins/list');

export const getMarketData = () =>
  axios.get<MarketData[]>(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
