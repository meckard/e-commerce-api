const db = require('../queries')
const createError = require('http-errors')
const bcrypt = require('bcrypt')



    const findUserByEmail = async (email) => {
        try {
            const userExist = await db.query(`SELECT * FROM public.user WHERE email = $1`, [email])
    
            if(userExist.rows?.length) {
                return userExist.rows[0]
            }

            return null
           } catch(err) {
            console.log(err)
           }
    }

    const createUser = async (email, firstName, lastName) => {
        console.log(email)
        const statment = `INSERT INTO public.user(email, first_name, last_name)
                          VALUES($1, $2, $3)`

        const result = await db.query(statment, [ email, firstName, lastName ])

        if(result.rows?.length) {
            return result.rows[0]
        }

        return null
    }

    const login = async (email, password) => {
           try {

            const userExists = await findUserByEmail(email)
                if(!userExists) {
                throw createError(401, 'Incorrect username or password')
            }

            const passwordCompare = await bcrypt.compare(password, userExists.password, function(err, result) {
                if(err) {
                    console.log(err)
                }
                return result
            })
        } catch(err) {
            console.log(err)
        }

           
    }

    const register = async (email, firstName, lastName) => {
        

       try {
        const userExists = await findUserByEmail(email)

        if(userExists) {
            throw createError(409, 'Email already in use')
        }

        return await createUser(email, firstName, lastName)
       } catch(err) {
        throw createError(500, err)
    }
    } 

    const updatePassword = async (userId, newPassword, email) => {
        console.log(userId)
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
        const statement = 'UPDATE public.user SET password = $1 WHERE id = $2'
        const values = [hashedPassword, userId]


        const user = await findUserByEmail(email)

        if(!user) {
            throw createError(404, 'User not found')
        }

        const result = await db.query(statement, [hashedPassword, userId])

        if(result.rows?.length) {
            return result
        }

        return null
    }

    module.exports = {
        register,
        findUserByEmail,
        createUser,
        login,
        updatePassword
    }