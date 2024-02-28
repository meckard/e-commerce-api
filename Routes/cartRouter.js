const express = require('express')
const router = express.Router()
const cartUtil = require('../Utils/cartUtils')
const orderUtil = require('../Utils/orderUtils')

module.exports = (app) => {

    app.use('/cart', router)


    router.get('/my_cart', async (req, res, next) => {
        try{
            const cart = await cartUtil.findCartByUser(req.user.id)

            if(!cart) {
                const result = await cartUtil.newCart(req.user.id)

                return result
            }

            const getItems = await util.findItemsByCart(cart.id)

            res.status(200).send(getItems)
        } catch(err) {
            next(err)
        }
    })

    router.post('/my_cart/add_item', async (req, res, next) => {
        const { productId } = req.body

        try {
            const cart = await cartUtil.findCartByUser(req.user.id)

            if(!cart) {
                const result = await cartUtil.newCart(req.user.id)

                return result
            }

            const addItem = await cartUtil.addItemToCart(productId, cart.id)
            res.status(200).send(addItem)
        } catch(err) {
            next(err)
        }
    })

    router.delete('/delete_item', async (req, res, next) => {
        const { itemId } = req.body

        console.log(itemId)

        console.log(req.user.id)

        try {
            const deleteItem = await cartUtil.deleteItemFromCart(itemId)

            console.log(deleteItem)
            res.status(200).send(deleteItem)
        } catch(err) {
            next(err)
        }
    })

    router.post('/checkout', async (req, res, next) => {
        const { userId } = req.user
        const { cartId } = req.body

        try{
        const getItems = await util.getItemPrice(cartId)

        const total = getItems.reduce((total, item) => {
            return total += Number(item.price)
        }, 0)

        const newOrder = await orderUtil.createOrder(total, userId)
        const items = getItems.map((item) => {
           [{
            quantity: item.quantity,
            price: item.price,
            orderId: newOrder.id,
            productId: item.productId
           }]
        })

        const addItems = await orderUtil.addItems(items)

        //add payment logic at some point

        cartUtil.checkedOut(cartId)
        const order = orderUtil.completeOrder(newOrder.id)

        return order
    } catch(err) {
        next(err)
    }

    })

}