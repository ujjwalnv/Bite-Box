import mongoose from 'mongoose';
import { itemSchema } from './restaurantModel.js';

const cartItemSchema = new mongoose.Schema({
    cart_item:{
        type: itemSchema
    },
    unit:{
        type: Number,
        default: 1,
        min: 1,
        max: 99
    }
})

export const cartSchema = new mongoose.Schema({
    items:{
        type: [cartItemSchema]
    },
})

export const Cart = mongoose.model('Cart', cartSchema);