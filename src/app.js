const express = require('express');
const app = express();
const cors = require('cors')

const index = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', index);

module.exports = app;