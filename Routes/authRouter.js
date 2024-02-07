const express = require('express')
const router = express.Router()
const db = require('../queries')
const util = require('../Utils/utils.js')
const bodyParser = require('body-parser')
const passportSetup = require('../Loaders/passport.js')
const passport = require('passport')

const jsonParser = bodyParser.json()

module.exports = (app) => {

    app.use(jsonParser)

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/auth', router)

    router.post('/register', async (req, res, next) => {
        try {
            console.log(req.body)

            const response = await util.register(req.body.email, req.body.firstName, req.body.lastName)
            res.status(200).send(response)
        } catch(err) {
            next(err)
        }
    })

    router.post('/update-password', async (req, res, next) => {
        try {

            const response = await util.updatePassword(req.body.id, req.body.password, req.body.email)
            res.status(200).send(response)
        } catch(err) {
            next(err)
        }
    })

    router.post('/login',  async (req, res, next) => {
        try {
            const { email, password } = req.body

            console.log(email, password, util.login)

            const response = await util.login(email, password)

            res.status(200).send(response)
        } catch (err) {
            console.log(err)
        }
    })
}