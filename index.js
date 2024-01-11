const express = require('express')
const app = express()
const { PORT } = require('./config')
const bodyParser = require('body-parser')
const db = require('./queries.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.get('/users', db.getUsers)