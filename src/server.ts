import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import { connectDB as connect } from './db/connect';

dotenv.config();

const port = process.env.PORT || 9000;

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, async () => {
  await connect();
  console.log('🚀 Connection successful');
});
