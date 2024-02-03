import { constants } from 'http2';
import express from 'express';
import { Restaurant } from '../models/restaurantModel.js';

const router = express.Router();



router.get('/restaurant', async (req, res) => {
    const result = await Restaurant.find({});
    
    res.send({data: result});
})

export default router;
