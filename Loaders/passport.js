const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../queries')
const util = require('../Utils/authUtils')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

module.exports = (app) => {

    app.use(passport.session())

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })    

    passport.deserializeUser((id, done) => {
        done(null, { id })
    })

    passport.use(new LocalStrategy(
        {usernameField: "email"},
        async (username, password, done) => {
           try {
            
            const login = await util.login(username, password)

            return done(null, login)

            } catch(err) {
                return done(err)
            }
        }
    ))

    return passport
}