const routeLoader = require('../Routes/userRoute.js')

module.exports = async (app) => {

    await routeLoader(app)

}