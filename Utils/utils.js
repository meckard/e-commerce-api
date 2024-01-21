const db = require('../queries')

module.exports = () => {

    const findUserByEmail = async (email) => {
        try {
            const userExist = await db.query(`SELECT * FROM public.user WHERE email = ${email}`)
    
            if(userExist.rows?.length) {
                return userExist.rows[0]
            }

            return null
           } catch(err) {
            throw new err
           }
    }

    const createUser = ()

    const register = async (email) => {
       try {
        const userExists = await findUserByEmail(email)

        if(userExists) {
            throw createError(409, 'Email already in use')
        }
       }
    }
}