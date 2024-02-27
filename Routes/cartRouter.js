const express = require('express')
const router = express.Router()
const util = require('../Utils/cartUtils')

module.exports = (app) => {

    app.use('/cart', router)


    router.get('/my_cart', async (req, res, next) => {
        try{
            const cart = await util.findCartByUser(req.user.id)

            if(!cart) {
                const result = await util.newCart(req.user.id)

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
            const cart = await util.findCartByUser(req.user.id)

            if(!cart) {
                const result = await util.newCart(req.user.id)

                return result
            }

            const addItem = await util.addItemToCart(productId, cart.id)
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
            const deleteItem = await util.deleteItemFromCart(itemId)

            console.log(deleteItem)
            res.status(200).send(deleteItem)
        } catch(err) {
            next(err)
        }
    })

    router.post('/checkout', async (req, res, next) => {
        //const { id } = req.user
        //const { cartId } = req.body

        const getItems = await util.getItemPrice(2)

        const totalItems = getItems.reduce((total, item) => {
            return total += Number(item.price)
        }, 0)

        console.log(totalItems)
    })

}