const {Router} = require('express')
const router = Router()

const products = require('../products.json');
const cart = require('../cart.json');

//routes
router.get('/', (req, res) => {
    res.json(products);
})

router.post('/', (req, res) => {
    const { name, price} = req.body;
    if(name && price){
        const id = cart.length + 1
        const newBuy = {id, ...req.body}
        cart.push(newBuy)
        res.json(cart)
        //cart.push()
    }else{
        res.json({Error:'Wrong request'})
    }
})

module.exports = router;