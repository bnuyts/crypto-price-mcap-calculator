import express from 'express';
import { calc } from './mcap/calc';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use('/mcap/calc', calc);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
