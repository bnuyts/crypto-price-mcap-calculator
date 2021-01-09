import axios from 'axios';

interface CryptoData {
  usd: number;
  usd_market_cap: number;
}

type SimplePrice = {
  [k: string]: CryptoData;
};

export const getSimplePriceData = (tokens: string[] = ['bitcoin']) =>
  axios.get<SimplePrice>(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokens.join(
      '%2C'
    )}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`
  );
