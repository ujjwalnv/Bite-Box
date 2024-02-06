import { constants } from 'http2';
import express from 'express';
import { User } from '../models/userModel.js';
import { Cart } from '../models/cartModel.js';
import { Item } from '../models/restaurantModel.js';

const router = express.Router();

// Get cart details based on user id
router.get('/cart/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findById(user_id);
        const cart = await Cart.findById(user.cart.id)

        return res.send({items: cart.items})
    } catch (error) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({message: `An error occured: ${error}`})
    }
})

// Add or removes items from cart
router.put('/cart/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findById(user_id);
        const item = await Item.find({});
        const cart_id = user.cart.id;
        const cart_items = req.body.items.filter((element) => {
            if(element.units > 0 && element.units < 100) return element;
        });
        
        if(!cart_items) return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({message: "Cart is empty.", item: item});
        
        const result = await Cart.findByIdAndUpdate(cart_id, {
            items: cart_items,
        })

        return res.send({result: result})
    } catch (error) {
        return res.send({message: `An error occured: ${error}`})
    }
})

export default router