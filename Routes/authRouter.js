const express = require('express')
const router = express.Router()
const db = require('../queries')

module.exports = (app) => {

    app.use('/auth', router)

    router.post('/register', async (req, res, next) => {
        
    })
}