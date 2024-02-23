const db = require('../queries')

const createOrder = async (total, userId) => {
    const statement = 'INSERT INTO public.order (total, user_id) VALUES($1, $2)'
    const values = [total, userId]

    const response = await db.query(statement, values)

    if(response.rows?.length) {
        return response.rows
    }

    return null
}

const deleteOrder = async (orderId) => {
    const statement = 'DELETE FROM public.order WHERE id = $1'
    const values = [orderId]

    const response = await db.query(statement, values)

    return response.rows
}

const addItems = async (items) => {
   const itemQuery = items.map( async (item) => {
        const statment = 'INSERT INTO public.order_item (quantity, price, order_id, product_id VALUES($1, $2, $3, $4)'
        const values = [item.quantity, item.price, item.orderId, item.productId]

        const response = await db.query(statment, values)

        if(response.rows?.length) {
            return response.rows
        }

        return null
    })

    return itemQuery
}