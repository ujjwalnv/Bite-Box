import mongoose from 'mongoose'
import { cartSchema } from '../models/cartModel.js'

const userSchema = mongoose.Schema(
    {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cart:{
        type: cartSchema,
        required: true,
        unique: true
    }
},
{
    timestamps: true,
}
)

const unverifiedUserSchema = mongoose.Schema(
    {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    }
},
{
    timestamps: true,
}
)

export const User = mongoose.model('User', userSchema)
export const UnverifiedUser = mongoose.model('UnverifiedUser', unverifiedUserSchema)