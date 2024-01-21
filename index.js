const express = require('express');
require('dotenv').config()
const app = express();
const { PORT } = require('./config.js');
const loaders = require('./Loaders')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

loaders(app)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})