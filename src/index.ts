import express from 'express';
import { calc } from './mcap/calc';
import dotenv from 'dotenv';
import { coin } from './list/coin';
import { market } from './list/markets';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use('/mcap/calc', calc);
app.use('/list/coin', coin);
app.use('/list/market', market);
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
