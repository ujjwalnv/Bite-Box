import { constants } from 'http2';
import express from 'express';
import { Restaurant } from '../models/restaurantModel.js';

const router = express.Router();

// TODO: Create and add items Restaurants based on their id

router.get('/restaurant', async (req, res) => {
    const result = await Restaurant.find({});
    
    res.send({data: result});
})

// TODO: Get restaurant by id

export default router;
