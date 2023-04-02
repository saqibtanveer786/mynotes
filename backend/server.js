const express = require('express');
const connectToMongo = require('./db');
const mongoose = require('mongoose');
var cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

connectToMongo();

if (process.env.NODE_ENV === 'production') {
  console.log('working');
  app.use(express.static(path.join('client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

if (process.env.PORT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;
