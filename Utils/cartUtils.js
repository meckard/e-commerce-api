const db = require('../queries')
const createError = require('http-errors')

const newCart = async (userId) => {
    const statment = 'INSERT INTO public.cart (user_id) VALUES($1)'
    const values = [userId]

    const result = await db.query(statment, values)

    return result
}

const findCartByUser = async (userId) => {
    const statement = 'SELECT * FROM public.cart WHERE user_id = $1'
    const values = [userId]

    const result = await db.query(statement, [userId])

    if(result.rows?.length) {
        console.log(result.rows)
        return result.rows[0]
    } else {
        return null
    }

}

const findItemsByCart = async (cartId) => {
    const statement = 'SELECT * FROM public.cart_item WHERE cart_id = $1'
    const values = [cartId]

    const result = await db.query(statement, values)

    if(result.rows?.length) {
        return result.rows
    } else {
        return null
    }
}

const addItemToCart = async (productId, cartId) => {
    const statement = 'INSERT INTO public.cart_item(product_id, cart_id) VALUES($1, $2)'
    const values = [productId, cartId]

    const result = await db.query(statement, values)

    if(result.rows?.length) {
    return result.rows
    } else {
        return null
    }
}

const deleteItemFromCart = async (itemId) => {
    const statement = 'DELETE FROM public.cart_item WHERE id = $1'
    const values = [itemId]

    const result = await db.query(statement, [itemId])

    return result
}

const getItemPrice = async (cartId) => {
    const statement = 'SELECT public.cart_item.quantity, public.cart_item.id, public.products.id, public.products.price FROM public.cart_item INNER JOIN public.products * ON public.products.id = public.cart_item.product_id WHERE cart_id = $1'
    const values = [cartId]

    const response = await db.query(statement, values)

    if(response.rows?.length) {
        return response.rows
    }

    return []

}

module.exports = {
    newCart,
    findCartByUser,
    getItemPrice,
    findItemsByCart,
    addItemToCart,
    deleteItemFromCart
}