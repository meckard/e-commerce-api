const express = require('express');
require('dotenv').config()
const app = express();
const { PORT } = require('./config.js');
const loaders = require('./Loaders')

async function startServer() {

loaders(app)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
}

startServer()