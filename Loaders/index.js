const userLoader = require('../Routes/userRoute.js')
const authLoader = require('../Routes/authRouter.js')
const passportLoader = require('../Loaders/passport.js')
const expressLoader = require('./express.js')
const productsLoader = require('../Routes/productRouter.js')

module.exports = async (app) => {

    await expressLoader(app)
    await passportLoader(app)
    await userLoader(app)
    await productsLoader(app)
    await authLoader(app)
}