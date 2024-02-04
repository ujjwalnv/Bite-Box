import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export const itemSchema = new mongoose.Schema({
    name:{
        type: String, required: true
    },
    price:{
        type: Number, required: true
    },
    restaurant_id:{
        type: ObjectId, required: true
    }
})

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String, required: true
    },
    email:{
        type: String, required: true
    },
    items:{
        type: [itemSchema], required: true
    },
    image:{
        type: String
    },
    type:{
        type: String, enum: ['veg', 'non-veg']
    }
})

export const Item = mongoose.model('Item', itemSchema);
export const Restaurant = mongoose.model('Restaurant', restaurantSchema);