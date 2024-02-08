import express from 'express';
import { Item, Restaurant } from '../models/restaurantModel.js';
import { authenticateJWT }  from '../middleware/authenticateJWT.js';

const router = express.Router();

// Create and add items Restaurants based on their id
router.post('/addItems', authenticateJWT, async (req, res) => {
    // Get restaurant
    const restaurant_id = req.body.id;
    const items = req.body.items;
    let counter = 0;
    
    // iterate through items array, Create item for each and add that item to the restaurant model
    for(const element of items) {
        const item_name = element.name;
        const item_price = element.price;

        const item = await Item.create({
            name: item_name,
            price: item_price,
            restaurant_id: restaurant_id
        })

        await Restaurant.findByIdAndUpdate(
            restaurant_id,
            {$push: {items: item}}
        )
        counter++;
    }

    
    res.send({message: `Added ${counter} items to the menu.`});
})

router.get('/restaurant', authenticateJWT, async (req, res) => {
    const result = await Restaurant.find({});
    
    res.send({data: result});
})

// Get restaurant by id
router.get('/restaurant/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);

    if(!restaurant){
        return res.status(404).send({message: "Book not found!"})
    }

    return res.status(200).send(restaurant)
})

export default router;
