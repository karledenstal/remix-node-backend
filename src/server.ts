const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv-safe');
const logger = require('morgan');
const connect = require('./db/connect.ts');

dotenv.config({
  allowEmptyValues: true,
});

const port = process.env.PORT || 9000;

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log('connected to port', port);
  connect();
});
