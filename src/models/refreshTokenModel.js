import mongoose from 'mongoose'

const refreshTokenDBSchema = mongoose.Schema({
    refresh_token:{
        type: String,
        required: true,
        unique: true
    }
})

export const RefreshTokeDB = mongoose.model('RefreshTokenDB', refreshTokenDBSchema);