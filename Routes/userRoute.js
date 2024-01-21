const express = require('express');
const router = express.Router()
const db = require('../queries')

module.exports = (app) => {

    app.get('/users', async (req, res, next) => {
        try {
            const response = await db.query('SELECT * FROM public.user')

            res.status(200).send(response.rows);
        } catch(err) {
            next(err)
        }
    })
    

    app.use('/users', router)

    

}
